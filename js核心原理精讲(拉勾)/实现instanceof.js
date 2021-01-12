// right 为构造函数， left为由构造函数生产的实例
function myInstanceof(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if(typeof left !== 'object' || left === null) {
    return false
  };

  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);

  while(true) { //循环往下寻找，直到找到相同的原型对象
    if(proto === null) {
      return false
    };

    if(proto === right.prototype) { //找到相同原型对象，返回true
      return true;
    }
    // 继续向上找原型对象
    proto = Object.getPrototypeof(proto);
  }
}
// 验证一下自己实现的myInstanceof是否OK
console.log(myInstanceof(new Number(123), Number));    // true
console.log(myInstanceof(123, Number));                // false
