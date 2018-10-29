//js的数据类型有七种
//基本类型为String,Number,Boolean,Symbol,null,undefined
//Symbol可以参考es6中的Symbol
//引用类型为Object


//一：首先是最简单的typeof
//typeof的局限为
//如果是null，返回为object
//对于基本类型，返回自己
//对于function，返回function
//其余都是object
//以下均摘自原文
typeof ''; // string 有效
typeof 1; // number 有效
typeof Symbol(); // symbol 有效
typeof true; //boolean 有效
typeof undefined; //undefined 有效
typeof null; //object 无效
typeof [] ; //object 无效
typeof new Function(); // function 有效
typeof new Date(); //object 无效
typeof new RegExp(); //object 无效


//二：instanceof
//instanceof只能判断a是不是b的实例，而无法说a具体是哪种类型
//同时，如果a和b在两个iframe中建立的话，他们不在同一个原型链上，因此
let i = document.createElement('iframe');
document.body.appendChild(i);
let xArray = window.frames[0].Array;
let arr = new xArray(1,2,3); // [1,2,3]
arr instanceof Array; // false
arr instanceof xArray;//true

//三：constructor
//这是一种很好的办法
//a.constructor===b 如果是的话，那就可以说a是b类型
//然而有特例
//1：如果a是null或这undefined，那么他们没有constructor，所以得重新判断
//2：如果修改了constructor，就会出问题

//四：用Object.prototype,toString.apply(a)
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用

function Type(object) {
    let str = Object.prototype.toString.apply(object);//得拿到自己
    return str.substring(8, str.length - 1).toLowerCase();
};