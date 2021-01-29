// 1.把错误抛入生成器中（所以这里trycatch 可以捕获错误）
import ajax from 'ajax';
function foo() {
  ajax('url', function (err, data) {
    if (err) {
      it1.throw(err); // 向main抛出一个错误
    } else {
      it1.next(data); // 用收到的data恢复*main()
    }
  });
}

function* mian1() {
  try {
    var text = yield foo();
    console.log('text', text);
  } catch (error) {
    console.error(error);
  }
}

var it1 = mian1();
it1.next(); // 启动

// 2.从生成器（main）向外抛出错误
function* main2() {
  var x = yield 'Hello world'; // 返回值是'Hello world'
  console.log('入参', x); // 这里的x是第二次执行it.next(i) 传进来的参数i
  yield x.toLowerCase(); // 引发一个异常
  console.log('yield2', x);
}

var it2 = main2();
var first = it2.next().value; // Hello world
console.log('first', first);

try {
  var second = it2.next(42).value; // 构造一个错误 数字没有转化为大小写的方法
  console.log('second', second);
} catch (error) {
  console.log('catch', error);
}
