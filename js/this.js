//this最重要的一点就是，它取决于在哪里调用它，而不是在哪里声明的

//第一种，默认绑定window，strict模式下是undefined
function bar() {
    console.log(this);
}
bar()//Window

'use strict'
function bar1() {
    console.log(this)
}
bar1();//undefined

//第二种隐式绑定

function bar() {
    console.log(this)
}
var obj={
    bar:bar
}

obj.bar();//{bar:f}
bar()//window
//这里看到由于是obj调用的bar，因此它的隐式上下文对象是obj
//如果是obj1.obj2.obj3.bar()的话，直接取bar的最近一个，即obj3

//第三种，显性绑定
//用call，apply，bind函数来绑定this

//第四种，new绑定
function bar() {
    this.a=10;
    console.log(this)
}
var obj=new bar()//bar{a:10}

//this绑定优先级 new>显性>隐性>默认

//下面这个例子
function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
var b = foo(10);

console.log(a.a);    // window
console.log(b.a);    // 10


//这个是压轴题
function foo() {
    getName = function () { console.log (1); };
    return this;
}
foo.getName = function () { console.log(2);};
foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName () { console.log(5);}

//自己第一次做
foo.getName ();                // 这个就是foo对象的getName，所以是2
getName ();                    // 这里考察的是变量提升中普通变量和函数，先声明getName是个函数，5，然后呢var getName就被忽略了，然而有一个赋值，因此这里最后变成了4
foo().getName ();              // foo()return的this其实是window，而window.getName()被改成了1
getName ();                    // 这里其实调用的也是window的getName，因此是1
new foo.getName ();            // foo.getName()是一个匿名函数，这里应该就是2
new foo().getName ();          // 这里还是window.getName()还是1
new new foo().getName ();      // 这里new出来的其实是window.getName()这个函数，然后再new出来，其实还是1

//最后答案是2411233，前面5个都想通了，分析最后两个
//new foo.getName() => var obj=new foo();obj.getName()
//然而由于new出来的这个foo并没有getName，因此去它的原型上查找，找到了就是3

//分析最后一个，new foo()还是上面的玩意儿，然后第二个new就是new (new foo()).getName()，因此就是还是跑的就是foo.prototype.getName，把这个当作构造函数了，跑的还是console.log(3)

//第五种，箭头函数的this
//箭头函数完全根据外部作用域来决定this，它的父级还是使用上述四种规则
//箭头函数的this无法被显性修改

var obj= {
    that : this,
    bar : function(){
        return ()=>{
            console.log(this);
        }
    },
    baz : ()=>{
        console.log(this);
    }
}
console.log(obj.that);  // window
obj.bar()();            // obj
obj.baz();              // window

//obj.that就是在obj里调用this，那么肯定就是obj的环境window，而baz也是同理，obj这个对象是不包含作用域的哦，于是this就是它的父级window
//而bar就不一样，有一个function包住，那么里面的箭头函数的this就指向这个function所在的作用域，即obj

//再看这个例子
var foo=function(){
    return ()=>{console.log(this)}
}
foo()()//Window
//这里看出来其实它的默认调用者是foo()，而foo()绑定的this就是window，因此箭头函数随foo()的this，即window，但是如果给它的父级foo绑定一下自己

foo.apply(foo)()//function(){return ()=>{console.log(this)}}
//箭头函数中this随父级，而调用它的父级将this绑定到了foo上，因此这里也是foo