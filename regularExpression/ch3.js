//括号可以提供分组，只要使用了正则的方法reg.test,reg.exec或者str.match，那么RegExp.$1就对应匹配的第一个括号
//以下引用自原文
function match(){
    let regex = /(\d{4})-(\d{2})-(\d{2})/;
    let string = "2017-06-12";
    regex.test(string); // 正则操作即可，例如
    //regex.exec(string);
    //string.match(regex);
    console.log(RegExp.$1); // "2017"
    console.log(RegExp.$2); // "06"
    console.log(RegExp.$3); // "12"
}

//替换
function replace(){
    let regex = /(\d{4})-(\d{2})-(\d{2})/;
    let string = "2017-06-12";
    let result = string.replace(regex, "$2/$3/$1");
    console.log(result);
    // => "06/12/2017"
}

//反向引用，在正则中引用前面的匹配
function reference() {
    let regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
    //此处的\1就是指第一个match，也就是RegExp.$1
    let string1 = "2017-06-12";
    let string2 = "2017/06/12";
    let string3 = "2017.06.12";
    let string4 = "2016-06/12";
    console.log( regex.test(string1) ); // true
    console.log( regex.test(string2) ); // true
    console.log( regex.test(string3) ); // true
    console.log( regex.test(string4) ); // false
}


//example
function titleize(str) {
    //5.2 将每个单词的首字母转换为大写
    //我的思路是匹配每个非word和word之间的位置，然后替换
    return str.toLowerCase().replace(/\b(\w)/g,function (char) {
        return char.toUpperCase();
    })
    //作者的思路是开头或者空格后接一个字母就替换，而我直接用分割了
    // return str.toLowerCase().replace(/(?:^|\s)\w/g, function(c) {
    //     return c.toUpperCase();
    // });
}
console.log(titleize('my name is apple'));