# 作业

## 优化

|  项目名称   | 原代码行数 | 优化后代码行数 |
| :---------: | :--------: | :------------: |
| calculator  |    116     |      116       |
|    maze     |     46     |       61       |
| whac-a-mole |     93     |       94       |
|   puzzle    |    209     |      182       |

反思原因：为了不在原 html 文件中添加 script 标签，因此选择在 .js 文件中直接添加 script 标签，多出如下代码（8行）

> 文件中的 *_old.js 文件是原本的 .js 文件，而 .js 文件是优化后的文件

``` JavaScript
if (typeof $ === "undefined") {
    var flag = 0,a = document.createElement("script"), b = document.createElement("script");
    a.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";document.body.appendChild(a);
    b.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";document.body.appendChild(b);
    a.onload = b.onload = () => {
        flag++;
        if (flag == 2) main();
    }
}
```

## 心得

1. 使用 jQuery 能够大幅简化循环的操作
2. jQuery 函数大都返回一个 jQuery 对象，这个对象是个类数组对象，如果按照以往的数组的经验来操作，会出现挺多尴尬的问题
3. lodash 提供了大量的函数帮助处理数据（比如说 _.orderBy 和 _.sortBy）

## table 测试


经过测试的网站：
1. [https://fffengmjl.github.io/blog/note/%E6%95%B0%E5%80%BC%E8%AE%A1%E7%AE%97%E6%96%B9%E6%B3%95/2019.9.4/note](https://fffengmjl.github.io/blog/note/%E6%95%B0%E5%80%BC%E8%AE%A1%E7%AE%97%E6%96%B9%E6%B3%95/2019.9.4/note) （页面下方的作业表格）
2. [https://mottie.github.io/tablesorter/docs/](https://mottie.github.io/tablesorter/docs/)
3. [https://www.wanplus.com/lol/teamstats/](https://www.wanplus.com/lol/teamstats/)


具体代码：
```Javascript
if (typeof $ === "undefined") {var flag = 0,a = document.createElement("script"), b = document.createElement("script");a.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";document.body.appendChild(a);b.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";document.body.appendChild(b);a.onload = b.onload = () => {flag++;if (flag == 2) main();}}
```

展开之后：
``` Javascript
if (typeof $ === "undefined") {
    var flag = 0,a = document.createElement("script"), b = document.createElement("script");
    a.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";document.body.appendChild(a);
    b.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";document.body.appendChild(b);
    a.onload = b.onload = () => {
        flag++;
        if (flag == 2) main();
    }
}
```