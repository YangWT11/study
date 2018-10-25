//最基本的单例模式，由于js是单线程，所以不会有多线程的问题
function sample1() {//最简单的实现方式
    function Singleton(name) {
        this.name = name;
        this.instance = null;
    }//这里当作构造函数初始化名字和实例

    Singleton.prototype.getName=function () {
        return this.name;
    }//这里写作原型的方法，方便继承

    Singleton.getInstance=function (name) {
        if(this.instance){
            return this.instance;
        }else{
            return this.instance = new Singleton(name);
        }
    }

    let a = Singleton.getInstance('a');
    let b = Singleton.getInstance('b');
    console.log(a===b);//结果应该为true
}

function sample2(){//用闭包实现
    function Singleton(name) {
        this.name = name;
    }//这里当作构造函数初始化名字

    Singleton.prototype.getName=function () {
        return this.name;
    }//这里写作原型的方法，方便继承

    Singleton.getInstance=function(name){
        let instance = null;
        return function () {
            if(instance){
                return instance;
            }else{
                return instance = new Singleton(name);
            }
        }
    }();

    let a = Singleton.getInstance('a');
    let b = Singleton.getInstance('b');
    console.log(a===b);//结果应该为true
}

//有时候alert这种组件或者遮罩层，有一个就行了；以前的做法是弄一个全局变量，这样的话全局变量太多不易维护且能够被修改

// sample1();
// sample2();