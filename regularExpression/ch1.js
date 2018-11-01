//\d就是[0-9]。表示是一位数字。记忆方式：其英文是digit（数字）。
// \D就是[^0-9]。表示除数字外的任意字符。
// \w就是[0-9a-zA-Z_]。表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。
// \W是[^0-9a-zA-Z_]。非单词字符。
// \s是[ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。
// \S是[^ \t\v\n\r\f]。 非空白符。
// .就是[^\n\r\u2028\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号...中的每个点，都可以理解成占位符，表示任何类似的东西。

//.并不能匹配所有的字符，它不包括的有换行符，回车符，行分隔符，段分隔符。
//如果要匹配所有的有如下方法
// [\s\S]所有的空格符和非空格符
// [\d\D]所有的数字和非数字
// [\w\W]所有的字符和非字符
// [^]所有的非空
let dot=/./;
let all=/[^]/
let all1=/[\d\D]/
let testStr='\n';
console.log(testStr.match(dot));//null
console.log(testStr.match(all));//["↵", index: 0, input: "↵", groups: undefined]
console.log(testStr.match(all1));//same

//贪婪匹配和惰性匹配
//添加了？后就会匹配即止

//分支匹配也是惰性匹配，如果第一个满足了，就不会往后面了

//练习题

function test1() {
    //5.1 匹配16进制颜色值
    // 要求匹配：
    // #ffbbad
    // #Fc01DF
    // #FFF
    // #ffE
    // let reg=/\#([a-zA-Z0-9]{3}|[a-zA-Z0-9]{6})/;//第一次是这样的，结果由于是惰性，所以匹配到三个就不管了
    // let reg=/\#([a-zA-Z0-9]{6}|[a-zA-Z0-9]{3})/;//这次能匹配所有的，但是没有审题，十六进制只有到f
    let reg=/\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/;//这是作者提供的
    let ts1='#ffbbad';
    let ts2='#Fc01DF';
    let ts3='#FFF';
    let ts4='#ffE';
    console.log(ts1.match(reg));
    console.log(ts2.match(reg));
    console.log(ts3.match(reg));
    console.log(ts4.match(reg));
}
test1();

function test2() {
    //5.2 匹配时间
    // 以24小时制为例。
    // 要求匹配：
    // 23:59
    // 02:07
    let reg=/^([0-1][0-9]|2[0-3])\:[0-5][0-9]$/;
    let ts1='23:59';
    let ts2='02:07';
    console.log(ts1.match(reg));
    console.log(ts2.match(reg));
}
test2();

function test3() {
    //5.3 匹配日期
    // 比如yyyy-mm-dd格式为例。
    // 要求匹配：
    // 2017-06-10
    let reg=/[1-9][0-9]{3}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])/;//和作者一样，只是我不确定可以0999年？
    let ts1='2017-06-10';
    console.log(ts1.match(reg));
}
test3();

function test4() {
    //5.4 window操作系统文件路径
    // 要求匹配：
    // F:\study\javascript\regex\regular expression.pdf
    // F:\study\javascript\regex\
    // F:\study\javascript
    // F:\
    // let reg=/[A-Z]\:(\\.*)*/;//磁盘可以不分大小写
    // let reg=/[a-zA-Z]\:(\\.*)*/;//然而还是需要注意的是，文件夹不能是空名字，这样的话，ts5也能匹配，所以第一个\还是得拿出来，并且最后一个不能带\
    let reg=/[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?/;//这里还有问题，Windows文件名不能是[^\\:*<>|"?\r\n/]，不能包含\,:,*,<,>,|,",?,\r,\n,/
    let ts1='F:\\study\\javascript\\regex\\regular expression.pdf';
    let ts2='F:\\study\\javascript\\regex';
    let ts3='F:\\study\\javascript';
    let ts4='F:\\';
    let ts5='f:\\|';
    console.log(ts1.match(reg));
    console.log(ts2.match(reg));
    console.log(ts3.match(reg));
    console.log(ts4.match(reg));
    console.log(ts5.match(reg))
}
test4();

function test5() {
    //5.5 匹配id
    // 要求从
    // <div id="container" class="main"></div>
    // 提取出id="container"
    //一种不好的做法
    // let reg=/id=".*?"/;开启了惰性模式，这样遇到了第一组就直接退出，否则会变成id="container" class="main"，然而这样会有回溯问题
    let reg=/id="[^"]*"/;//哈哈，我直接就到了作者的最优解
    let ts1='<div id="container" class="main"></div>';
    console.log(ts1.match(reg));
}
test5();