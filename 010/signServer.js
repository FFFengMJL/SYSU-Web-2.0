let fs = require("fs");
let dataPath = 'mongodb://localhost:27017';
let signup = './signup.html'
let mongodb = require("mongodb");
let mongoClient = mongodb.MongoClient;
let express = require("express");
let session = require('express-session'); // 利用session来管理cookie
let app = express();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended : false});

// 初始化数据库
(function initialDB() { 
    app.use(express.static('./assets')); // use static to send other file
    app.use(session({
        secret : 'keyborad cat',
        resave : false,
        saveUninitialized : true,
        cookie : {
            secure : true,
            maxAge : 2147483647,
            httpOnly : true
        }
    }));
    mongoClient.connect(dataPath, {useNewUrlParser : true}, (err, db) => {
        if (err) throw err;
        let dbo = db.db('users');
        dbo.createCollection('user', (err, res) => {
            if (err) throw err;
            console.log('database ready');
            db.close();
        });
    });
})();

// 查找数据库
function find(obj, callback){ 
    mongoClient.connect(dataPath, {useNewUrlParser : true}, (err, db) => {
        if (err) throw err;
        let dbo = db.db('users');
        dbo.collection('user').find(obj).toArray((err, result) => {
            if (err) throw err;
            // console.log(result);
            callback(result);
            db.close();
        });
    })
}

// 插入数据库
function insert(obj, callback) { 
    mongoClient.connect(dataPath, {useNewUrlParser : true}, (err, db) => {
        if (err) throw err;
        let dbo = db.db('users');
        dbo.collection('user').insertOne(obj, (err, result) => {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
}

// 注册页面
app.get('/regist', (req, res) => { 
    // console.log(req.originalUrl);
    fs.readFile(signup, 'utf-8', (err, data) => {
        res.send(data);
    });
});

// 利用ajax查询数据是否符合要求
app.get('/signSearch', (req, res) => { 
    // console.log(req.query);
    find(req.query, (result) => {
        res.send(`${result.length != 0}`);
    });
});

// 注册表单提交
app.post('/signUpPost', urlencodedParser, (req, res) => { 
    let tar = req.body;
    // console.log(tar);
    find(tar, result => {
        if (result.length == 0) {
            insert(tar, result => {
                if (result) {
                    req.session.user = {
                        username : tar.username,
                    }
                    res.redirect(`http://localhost:8000?username=${tar.username}`);
                }
            });
        }
        else {
            res.redirect('http://localhost:8000/jump?string=用户已经存在了')
        }
    })
});

// 登录页面
app.get('/login', (req, res) => {
    // console.log(req.cookies);
    fs.readFile('./login.html', 'utf-8', (err, data) => {
        res.send(data);
        return;
    });
});

// 登录
app.post('/login', urlencodedParser, (req, res) => {
    let tar = req.body;
    find({username : tar.username}, result => { // 用户名不存在
        if (result.length == 0) {
            res.redirect('http://localhost:8000/jump?string=用户名不存在');
            return ;
        }
        else {
            find(tar, result => { // 密码错误
                if (result.length == 0) {
                    res.redirect('http://localhost:8000/jump?string=用户名不存在');
                    return;
                }
                else { // 登录成功
                    req.session.user = {
                        username : tar.username
                    }
                    console.log(req.session.user + 'login')
                    res.redirect(`http://localhost:8000?username=${tar.username}`);
                    return;
                }
            });
        }

    });
});

app.get('/jump', (req, res) => {
    console.log(req.session.user + 'jump');
    fs.readFile('./jump.html', 'utf-8', (err, data) => {
        data = data.replace('出错了', req.query.string);
        res.send(data);
    });
});

// 详情
app.get('/', (req, res) => {
    let tar = req.session.user;
    console.log(tar + 'detail');
    if (!tar) res.redirect('http://localhost:8000/login'); // 没有cookie，跳转到登录页面
    else {
        find({username : tar.username}, result => {
            if (result.length == 0) {// cookie错误，跳转到跳转页面
                // req.session.user = {}; // 清空cookie
                res.redirect('http://localhost:8000/jump?string=只能够访问自己的数据');
            }
            else {
                fs.readFile('./user.html', 'utf-8', (err, html) =>  {
                    html = html.replace("目标用户名", result.username);
                    html = html.replace("目标学号", result.studentID);
                    html = html.replace("目标手机号", result.phone);
                    html = html.replace("目标邮箱", result.email);
                    // res.setHeader('Content/Type', 'text/html');
                    res.send(html);
                });
            }
        });
    }
});

let server = app.listen(8000, () => {
    let host = server.address().address;
    let port = server.address().port;
    // initialDB();
    console.log('server ready');
});