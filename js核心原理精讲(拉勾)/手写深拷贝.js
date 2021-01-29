/** 常见浅拷贝方法(for of 遍历数组元素本身，不能遍历对象；for in 遍历索引（适合遍历对象，对象遍历属性，若数组遍历下标）)
* 1. Json.stringfy() + Json.parse() 两次转换
* 2. 手写递归实现 => 终极版
*/

// 1.Json.stringify深拷贝测试
function stringifyTest() {
  function Obj() {
    this.func = function () { alert(1) };
    this.obj = { a: 1 };
    this.arr = [1, 2, 3];
    this.und = undefined;
    this.reg = /123/;
    this.date = new Date(0);
    this.NaN = NaN;
    this.infinity = Infinity;
    this.sym = Symbol(1);
  }

  let obj1 = new Obj();
  Object.defineProperty(obj1, 'innumerable', {
    enumerable: false,
    value: 'innumerable'
  });
  console.log('obj1', obj1);
  let str = JSON.stringify(obj1);
  let obj2 = JSON.parse(str);
  console.log('obj2', obj2);
}

// 2. 手写递归实现深拷贝（基础班）
function deepCloneBase(target) {
  let cloneObj = {};
  for (key in target) {
    if (typeof target[key] === 'object') {
      cloneObj[key] = deepCloneBase(target[key]); // 是对象再次调用递给深拷贝
    } else {
      cloneObj[key] = target[key]; //基本类型的话直接复制值
    }
  }
  return cloneObj;
}

/*****************
 * 终极版(针对基础版做优化)
 * - 1. 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys 方法；
 * - 2. 当参数为 Date、RegExp 类型，则直接生成一个新的实例返回；
 * - 3. 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性，以及对应的特性，顺便结合Object的create方法创建一个新对象，并继承传入原对象的原型链；
 * - 4. 利用WeakMap类型作为Hash表，因为WeakMap是弱引用类型，可以有效防止内存泄漏，作为检测循环引用很有帮助，如果存在循环，则引用直接返回WeakMap存储的值
 *   - 说明：Map和weakMap的关键区别
 *     weakMap的键名是对象的弱引用（垃圾回收机制不将该引用考虑在内），所以其所对应的对象可能会被自动回收。
 *     当对象被回收后，WeakMap自动移除对应的键值对。典型应用是，一个对应DOM元素的WeakMap结构，
 *     当某个DOM元素被清除，其所对应的WeakMap记录就会自动被移除。
 *     基本上，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
***********/

// 判断断是否引用类型
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {
  // 2.日期对象直接返回一个新的日期对象，正则对象直接返回一个新的正则对象
  if (obj.constructor === Date) {
    return new Date(obj);
  }

  if (obj.constructor === RegExp) {
    return new RegExp(obj);
  }

  // 4.如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  /* 3.Object.getOwnPropertyDescriptors 返回对象属性的描述对象 
    { 
      configurable: true
      enumerable: true
      value: 100
      writable: true
    }
  */
  let allDesc = Object.getOwnPropertyDescriptors(obj);

  // 3.遍历传入参数所有键的特性 Object.create(proto, source) 传入对象的原型和基础对象（可选）
  // 继承原型链
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  // 设置缓存
  hash.set(obj, cloneObj);

  // 1.Reflect.ownKeys 可以获取对象所有属性key(包括可枚举和不可枚举的)
  for (let key of Reflect.ownKeys(obj)) { 
    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
  }

  return cloneObj
}

// 下面是验证代码
let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () { console.log('我是一个函数') },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
};
Object.defineProperty(obj, 'innumerable', {
  enumerable: false, value: '不可枚举属性' }
);
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj    // 设置loop成循环引用的属性
let cloneObj = deepClone(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)
