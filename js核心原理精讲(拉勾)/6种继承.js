/**
 * 6种继承
 * 1.原型链继承
 * 2.构造函数继承
 * 3.1 + 2 => 组合继承
 * 4.原型式继承
 * 5.寄生继承
 * 6.3 + 5 => 继承组合继承（终极版）
 */

//  1.原型链继承,缺点：内存共享
function Parent1() {
  this.name = 'parent1';
  this.play = [1, 2, 3];
}
Parent1.prototype.getName = () => {
  this.name;
}
function Child1() {
  this.age = 18;
}
Child1.prototype = new Parent1();
// 创建实例
const person1 = new Child1();


// 构造函数继承，借助call 缺点：不能继承原型链 即Child2实例 执行.getName() 报错
function Parent2() {
  this.name = 'Parent2';
}
Parent2.prototype.getName = () => {
  this.name;
}
function Child2() {
  Parent2.call(this);
  this.age = 18;
}
// 创建实例
const person2 = new Child2();


// 3.组合继承，缺点：Parent3执行两次 浪费内存
function Parent3() {
  this.name = 'Parent3';
}
Parent3.prototype.getName = () => {
  this.name;
}
function Child3() {
  Parent3.call(this);// 第一次
  this.age = 18;
} 
Child3.prototype = new Parent3(); // 第二次
// 构造函数指向自己
Child3.prototype.constructor = Child3;
// 创建实例
const person3 = new Child3();


// 4.原型式继承,缺点：内存共享
const parent4 = {
  name: 'parent4',
  friends: [1, 2, 3, 4, 5],
  getName: function() {
    return this.name;
  }
}
// 创建实例 Object.create() 实现的是浅拷贝
const child4 = Object.create(parent4);

// 5.寄生继承,原型式在父类基础上增加了更多的方法，比如这里的getFriends,缺点：内存共享
const parent5 = {
  name: 'parent5',
  friends: [1, 2, 3, 4, 5],
  getName: function() {
    return this.name;
  }
}
function clone5(parent) {
  const cloneObj = Object.create(parent);
  cloneObj.getFriends = function() {
    return this.friends;
  }
  return cloneObj;
}
// 创建实例
const person5 = clone5(parent);


// 6.终极版 3 + 5 => 寄生组合继承（es6的关键词extends采用的是这种方式）
function clone6(parent, child) {
  // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}
function Parent6() {
  this.name = 'Parent6';
}
Parent6.prototype.getName = () => {
  this.name;
}
function Child6() {
  Parent6.call(this);// 只用一次
  this.age = 18;
}
clone6(Parent6, Child6);
// 子类可以重新定义方法
Child6.prototype.getAge = function() {
  return this.age;
}
// 创建实例
const person6 = new Child6();


// 应用: es6的extends
class Person {
  // 构造函数相当于执行this.xx = xxx;
  constructor(name) {
    this.name = name
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log('Person:', this.name)
  }
}
class Gamer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    super(name)
    this.age = age
  }
  // 子类新增的原型方法
  getAge = function () {
    return this.age
  }
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法
