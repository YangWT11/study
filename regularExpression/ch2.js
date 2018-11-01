//多行模式中，^和$是匹配行的，例子来源于作者
// var result = "I\nlove\njavascript".replace(/^|$/gm, '#');
// console.log(result);
// /*
// #I#
// #love#
// #javascript#
// */


//example
//不匹配任何东西的字符
function test1() {
    //自己的做法
    // let reg=/[^\d\D]/;
    let reg=/.^/;//解释为只有一个字符，然而该字符后面是开头
    console.log(reg.test(''))
}
test1();

function test2() {
    //4.2 数字的千位分隔符表示法
    // 比如把"12345678"，变成"12,345,678"。
    // 可见是需要把相应的位置替换成","。
    // 思路是什么呢？
    //从后面往前数，每三位插一个,
    let reg1=/(?=([0-9]{3}))/;//这样它从头匹配，然后插在最前面，变成了 ,123456789
    let reg2=/(?=([0-9]{3}$))/;//这样它要求以三个数字结尾的位置前面，变成了123456,789
    let reg3=/(?=([0-9]{3})+$)/;//这样匹配至少1次以xxx结尾，于是变成,123456789，g因为没有global匹配，因此整个正则就还是变成了以xxxxxxxxx结尾，在前面加,
    let reg4=/(?=([0-9]{3})+$)/g;//发现最前面也有，所以前面处理一下
    let reg5=/(?!^)(?=([0-9]{3})+$)/g;//要求以xxx结尾的这个数字，它不是开头
    let str='123456789';
    console.log(str.replace(reg1,','))//,123456789
    console.log(str.replace(reg2,','))//123456,789
    console.log(str.replace(reg3,','))//,123456789
    console.log(str.replace(reg4,','))//,123,456,789
    console.log(str.replace(reg5,','))//123,456,789

    //拓展，如果是123456 1234，要求变成123,456 1,234那么就可以理解为
    // \b 1 \B 2 \B 3 \B 4 \B 5 \B 6 \b space \b 1 \B 2 \B 3 \B 4 \b
    //先理解1234直接写成\b形式
    let reg6=/\B(?=([0-9]{3})+\b)/g;
    console.log(str.replace(reg6,','))//123,456,789
    //\b 1 \B 2 \B 3 \B 4 \B 5 \B 6 \B 7 \B 9 \b
    //所以最后一个可以理解为以\b结束三个数字，插入一个,变成
    //\b 1 \B 2 \B 3 \B 4 \B 5 \B 6 \b , \b 7 \B 8 \B 9 \b
    //然后你会发现，从,前面的\b开始又形成了以\b结尾的三个数字，456
    //再解释以\B开头，做到后面发现变成了这样
    //\b 1 \B 2 \B 3 \b , \b 4 \B 5 \B 6 \b , \b 7 \B 8 \B 9 \b
    //于是你发现123前面是以\b开头的，不符合
    //那么最上面那种情况也可以自行理解了
}
test2();

function test3() {
    //4.3 验证密码问题
    // 密码长度6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符。
    // 此题，如果写成多个正则来判断，比较容易。但要写成一个正则就比较困难。
    let reg = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,12}$/;
    //这种强调不能全是数字,小写字母，大写字母
    let reg1= /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/;
    //参考的作者的写法
    console.log( reg.test("1234567") ); // false 全是数字
    console.log( reg.test("abcdef") ); // false 全是小写字母
    console.log( reg.test("ABCDEFGH") ); // false 全是大写字母
    console.log( reg.test("ab23C") ); // false 不足6位
    console.log( reg.test("ABCDEF234") ); // true 大写字母和数字
    console.log( reg.test("abcdEF234") ); // true 三者都有
    console.log( reg1.test("1234567") ); // false 全是数字
    console.log( reg1.test("abcdef") ); // false 全是小写字母
    console.log( reg1.test("ABCDEFGH") ); // false 全是大写字母
    console.log( reg1.test("ab23C") ); // false 不足6位
    console.log( reg1.test("ABCDEF234") ); // true 大写字母和数字
    console.log( reg1.test("abcdEF234") ); // true 三者都有
}
test3();