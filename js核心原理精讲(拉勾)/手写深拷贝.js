/** 常见浅拷贝方法
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

// 终极版
// 判断是否引用类型
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
// hash 缓存
const deepClone = function (obj, hash = new WeakMap()) {
  // 日期对象直接返回一个新的日期对象
  if (obj.constructor === Date) {
    return new Date(obj);
  }

  // 正则对象直接返回一个新的正则对象
  if (obj.constructor === RegExp) {
    return new RegExp(obj);
  }

  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  /* Object.getOwnPropertyDescriptors 返回对象属性的描述对象 
    { 
      configurable: true
      enumerable: true
      value: 100
      writable: true
    }
  */
  let allDesc = Object.getOwnPropertyDescriptors(obj);

  // 遍历传入参数所有键的特性 Object.create(proto, source) 传入对象的原型和基础对象（可选）
  // 继承原型链
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  // 设置缓存
  hash.set(obj, cloneObj);

  // Reflect.ownKeys 可以获取对象所有属性key(包括可枚举和不可枚举的)
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
