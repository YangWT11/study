//浅拷贝，其实可以理解就是对一个对象引用的拷贝
//对一个对象进行$.extend({}, obj); Array.prototype.slice()和Array.prototype.concat()操作时，会浅拷贝一个对象
//如果对象内部是基本类型值，就会拷贝一个新的基本类型值，但是如果内部是引用，那么就会拷贝这个引用，而不会递归下去

//以下例子引用自来源
let o1 = ['darko', {age: 22}];
let o2 = o1.slice(); // 根据Array.prototype.slice()的特性，这里会返回一个o1的浅拷贝对象
console.log(o1 === o2); // => false，说明o2拷贝的是o1的一个实例
o2[0] = 'lee';
console.log(o1[0]); // => "darko" o1和o2内部包含的基本类型值，复制的是其实例，不会相互影响
o2[1].age = 23;
console.log(o1[1].age); // =>23 o1和o2内部包含的引用类型值，复制的是其引用，会相互影响

//自己尝试一个浅拷贝
//如果是基本类型，那只能叫做把o1的值赋给o2，之后o2修改自己都对o1没有影响
function shadowClone(source) {
    if(!source||typeof source!=='object'){
        throw new Error('拷贝的不是对象')
    }
    let targetSource=Object.prototype.toString.apply(source)==='[object Object]'?{}:[];//可以参考如何判断对象类型 typeof.js
    for(let key in source){
        if(source.hasOwnProperty(key)){//这里应该目的是只拷贝source自己的属性
            targetSource[key]=source[key];
        }
    }
    return targetSource
}

//参考自https://github.com/wengjq/Blog/issues/3
//还可以用Object.assign-》待总结

//接下来是深拷贝，如果发现拷贝的是对象的话，继续拷贝
//这里有一个致命的问题，就是如果我的内部有循环引用就永远出不去了
function deepClone(source) {
    if(!source||typeof source!=='object'){
        throw new Error('拷贝的不是对象')
    }
    let targetSource=Object.prototype.toString.apply(source)==='[object Object]'?{}:[];
    for(let key in source){
        if(source.hasOwnProperty(key)){//这里应该目的是只拷贝source自己的属性
            let type=Object.prototype.toString.apply(source[key]);
            if(type=='[object Object]'||type=='[object Array]'){//或许这里还要加上很多，类似Date，Function之类的，因为引用的类型实在太多了
                targetSource[key]=deepClone(source[key]);
            }else{
                targetSource[key]=source[key];
            }
        }
    }
    return targetSource
}

//下面这种是用序列化和反序列化做
//存在的问题函数对象和原型成员会被忽略
//正则表达式会被丢弃
//constructor会被指向Object
//日期不会被忽略
//这里引用自原文
function deepClone(source){
    return JSON.parse(JSON.stringify(source));
}
let o1 = {
    arr: [1, 2, 3],
    obj: {
        key: 'value'
    },
    func: function(){
        return 1;
    }
};
let o2 = deepClone(o1);
console.log(o2); // => {arr: [1,2,3], obj: {key: 'value'}}

//关于拷贝的问题
//1：尽量不要对一个对象随便使用深拷贝
//2：深拷贝要考虑环以及正则/函数等特殊情况
//3：lodash的处理方式是使用栈，每次压栈的时候看看是不是已经有了，有了就不再压栈，同时用Object.prototype.toString.apply方式来判断类型，这样的话可以处理各种类型