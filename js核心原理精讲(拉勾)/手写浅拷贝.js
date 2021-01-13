/* *
 * 常见浅拷贝方法
 * 1. object.assign(target, source)
 * 2. 拓展运算符 ...
 * 3. arr1.concat(arr2)
 * 4. slice()
 */
// 手写浅拷贝
function shallowClone(target) {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (var key in target){
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

var n = shallowClone(123);
var s = shallowClone('string');
var array = [1, 2, 3, { value: 90 }];
var a = shallowClone(array);
var lili = { name: 'lili', age: 18, options: [1, 2, 3]};
var o = shallowClone(lili);
