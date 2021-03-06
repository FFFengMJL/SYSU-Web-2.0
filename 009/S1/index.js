(function(){
    const status = {informBar : false, num : false};
    let url = 'http://localhost';
    let port = 3000;

    function initial() {
        $(".num").on('click', function (event) {
            if (status.num || $(this).children('span').text() != '...') 
                event.preventDefault();
            else {
                disableButton($(this));
                console.log(`${$(this).attr('title')}`);
                $(this).children("span").css({backgroundColor : 'red', opacity : '1'}).text('...');
                $.get(`${url}:${port}/getNum`, (data) => {
                    $(this).children("span").text(data);
                    enablenButton($(this));
                    checkAt();
                });
            }
        });


        $('#button').mouseleave(() => {
            $('.num').children("span").css({opacity : '0'}).text('...');
            $('.num').css('backgroundColor', '#2e3ba4');
            $('.apb').css('backgroundColor', 'grey');
            $('#sum').text('');
        });

        $('.apb').click((event) => {
            if (!status.informBar) event.preventDefault();
            let sum = 0;
            if (status.informBar) {
                $('.val').each(function() {
                    sum += parseInt($(this).text());
                });
                $('#sum').text(`${sum}`);
                status.informBar = false;
                $('.apb').css('backgroundColor', 'grey');
            }
        });
    }

    function checkAt() {
        status.informBar = true;
        $('.val').each(function(tar) {
            if ($(this).text() == '...') status.informBar = false;
        });
        if (status.informBar) $('.apb').css('backgroundColor', '#2e3ba4');
        else $('.apb').css('backgroundColor', 'grey');
    }

    /**
     * 激活（enable）其余按钮，呈现为蓝色，用户可以点击，从服务器获取随机数
     */
    function enablenButton(Obj) {
        Obj.css('background', 'grey');
        $('.val').each(function() {
            if ($(this).text() == '...') $(this).parent('.num').css('backgroundColor', '#2e3ba4');
        });
        // $(`.num[title!=${Obj.attr('title')}]`).css('backgroundColor', '#2e3ba4');
        status.num = false;
    }

    /*
     *
     *灭活（disable）其它按钮，变为灰色，用户不能够点击（点击没有响应，也不会发送新的请求到服务器）
     * 
    */
    function disableButton(Obj) {
        $(`.num[title!=${Obj.attr('title')}]`).css('backgroundColor', 'grey');
        status.num = true;
    }

    initial();
})();