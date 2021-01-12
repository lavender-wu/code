// 数据类型检测
// 方法1：typeof 可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断
// 方法2：instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型；
// 方法3：Object.prototype.toString.call

function getType(obj) {
  // 基础类型 和 function类型
  const type = typeof obj;
  if (type !== 'object') {
    return type;
  }

  // 引用类型 或者null
  // 对于 Object 对象，直接调用 toString() 就能返回 [object Object]；
  // 而对于其他对象，则需要通过 call 来调用，才能返回正确的类型信息,否则都会返回object
  const typeArray = Object.prototype.toString.call(obj);
  // \S 大写字母
  const reg = /^\[object (\S+)\]$/;
  const res = typeArray.replace(reg, '$1'); // $1 即（\S+）匹配的项
  return res.toLowerCase();
}

const result = getType(NaN); // number
