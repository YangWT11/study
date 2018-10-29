function Parent(name) {     //父构造函数
    this.name = name || 'parent';
}
Parent.prototype.say = function() {
    return this.name;
}
function Child(name) {}    //空白的子构造函数

//模式1：直接让子类继承自父类
(function inherit1(Child,Parent){
    Child.prototype=new Parent();//new的Parent（后面简称parent），其实是一个中介，这样等于Child的原型是parent，而parent的__proto__是Parent，这就做到了Child继承自Parent
    let child = new Child('child');
    console.log(child.name);//parent
    console.log(child.say());//parent
})(Child,Parent);
//这里的问题有两个
//第一个是子类构造函数无法传递参数
//第二个是每次都会new一个对象，这样会浪费内存（用单例的话，这种模式还是不好啊qaq


//模式2：借用父类的构造函数
(function inherit2(Child, Parent) {
    function Child() {
        Parent.apply(this,arguments);
    }
    let child = new Child('child');
    console.log(child.name)//child
    console.log(child.say())//child.say is not a function
})(Child,Parent);
//这里的问题是子类的原型并没有继承自父类，只是借用了父类的构造函数


//模式3：复合上面两个
(function inherit3(Child,Parent) {
    function Child() {
        Parent.apply(this,arguments);
    }
    Child.prototype=new Parent();
    let child = new Child('child');
    console.log(child.name)//child
    console.log(child.say())//child
    delete child.name
    console.log(child.name)//parent
})(Child,Parent)
//这里的问题也有两个
//第一个仍然是多余的parent，每次都要new一个
//第二个是父类和子类都有name，如果删掉了子类的，父类的会显现出来


//模式4：共享原型
(function inherit4(Child,Parent) {
    Child.prototype=Parent.prototype;
    function Child(name){
        this.name= name;
    }
    let child = new Child('child');
    console.log(child.name)//child
    console.log(child.say())//child
    delete child.name
    console.log(child.name)//undefined
})(Child,Parent)
//这样的话子类实例想要修改自己的方法，都会应用到所有的子类实例

//模式5：临时构造函数
(function inherit5(Child, Parent) {
    let F = function() {};      //空的临时构造函数
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    function Child(name){
        this.name=name;
    }
    let child = new Child('child');
    console.log(child.name)//child
    console.log(child.say())//child
    console.log(child.constructor)//Parent
})(Child,Parent)
//这里有两个可以提高的地方
//问题一还是每次都要声明一个F
//问题二是子类的构造函数不是自己，而是Parent


((function inherit5Extend() {
    let F = function() {};      //空的临时构造函数
    return function(Child,Parent){
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        function Child(name){
            this.name=name;
        }
        Child.constructor=Child;
        let child = new Child('child');
        console.log(child.name)//child
        console.log(child.say())//child
        console.log(child.constructor)//Child
    };
})())(Child,Parent)