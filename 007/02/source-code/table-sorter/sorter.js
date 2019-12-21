if (typeof $ === "undefined") {
    var flag = 0,a = document.createElement("script"), b = document.createElement("script");
    a.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
    document.body.appendChild(a);
    b.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";document.body.appendChild(b);
    a.onload = b.onload = () => {
        flag++;
        if (flag == 2) main();
    }
}

function initial () {
    // test = "▼";
    test = $("<span class = \"sort\"><span>").text("▼");
    // $("th").append($("<span class = \"sort\"><span>").text("▲"));
    $("th").append(test);
    $("th").data("mode", 0);
    $(".sort").hide();
}

function addLis() {
    $("th").click(function() {
        sortBack($(this));
        switch ($(this).children(".sort").text()) {
            case "▲": sortDesend($(this));break;
            case "▼": sortAsend($(this));break;
        }    
    })
}

function getList(obj) {
    var trList = [];
    $(obj.parents("table").children("tbody").children("tr")).each(function() {
        var tdList = [];
        $(this).children("td").each(function() {
            tdList[$(this).index()] = $(this).html();
        });
        trList.push(tdList);
    });
    return trList;
}

function rebuild(obj, tarList) {
    obj.parents("table").children("tbody").empty();
    for (var i = 0; i < tarList.length; i++) {
        var tr = $("<tr></tr>").text("");
        for (var j = 0; j < tarList[i].length; j++) {
            var td = $("<td></td>").html(tarList[i][j]);
            tr.append(td);
        }
        obj.parents("table").children("tbody").append(tr);
    }
}

function sortAsend(obj) { // 正序排列
    obj.children(".sort").show();
    obj.children(".sort").text("▲");
    obj.addClass("focus");
    var tarList = _.sortBy(getList(obj), function(tar) {return tar[obj.index()]});
    rebuild(obj, tarList);
}

function sortDesend(obj) { // 倒叙排列
    obj.children(".sort").show();
    obj.children(".sort").text("▼");
    obj.addClass("focus");
    var tarList = _.sortBy(getList(obj), function(tar) {return tar[obj.index()]}).reverse();
    rebuild(obj, tarList);
}

function sortBack(obj) { // 清除其他的排序标志
    // obj.parent().children("th").data("mode", 0);
    // obj.parent().children("th").children(".sort").hide();
    // obj.parent().children("th").removeClass("focus");
    obj.siblings().data("mode", 0);
    obj.siblings().children(".sort").hide();
    obj.siblings().removeClass("focus");
    // for (var i = 0; i < obj.prevAll().length; i++) {
    //     $(obj.prevAll()[i]).data("mode", 0);
    //     $(obj.prevAll()[i]).children(".sort").hide();
    // }
}

function main() {
    initial();
    addLis();
}