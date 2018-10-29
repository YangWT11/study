//new Function()
function test1() {
    const base = function (name='base') {
        this.name= name;
    }//这是构造函数
    base.prototype.sayHello=function () {
        console.log(this.name + ",hello")
    }

    let son = new base('son');
    son.sayHello();//son,hello
    //这里即继承了原型链，也执行了构造函数
}
test1();

//下面是new的原理
function test2() {
    let Base=function(name='base'){
        this.name=name;
    }
    let o1 = new Object();//先创建一个对象
    o1.__proto__ = Base.prototype;//将该对象的原型链指向base
    Base.call(o1,'o1');//然后调用Base的构造函数
    console.log(o1.name);//o1
}
test2();

function test3() {
    const base = function (name='base') {
        this.name= name;
    }//这是构造函数
    base.prototype.sayHello=function () {
        console.log(this.name + ",hello")
    }

    let son = Object.create(base.prototype);
    son.sayHello();//undefined,hello
    //这里可以看出根本没有调用构造函数
    //但是继承了原型链，有sayHello方法
}
test3();

function test4() {
    let Base=function(name='base'){
        this.name=name;
    }
    Object.create = function(o){//这里的o其实是需要创建的类的prototype
        let F = function(){}; // 隐式构造函数，这里把o的构造函数给隐藏了
        F.prototype = o;
        return new F(); // 返回一个new
        //这样的话就不会调用构造函数
    }
    let o=Object.create(Base.prototype);
    console.log(o.name)//undefined
}
test4();