var array = [];

function createNode() {
  let div;
  let i = 100;
  // 创建一个虚拟节点对象 createDocumentFragment()方法可以更安全改变文档的结构及节点
  let frag = document.createDocumentFragment();
  for(; i > 0; i--) {
    div = document.createElement('div');
    // 创建一个文本节点并作为子元素添加到div标签中
    div.appendChild(document.createTextNode(i));
    frag.appendChild(div);
  }
  document.body.appendChild(frag);
}

function badCode() {
  array.push([...Array(10000).keys()]);
  // createNode();
  var a = 0;;
  a++
  return a;
  // setTimeout(badCode, 1000);
}

// console.log(badCode());
const foo = () => {
  var arr = [];
  for(let i = 0; i< 10; i++) {
    arr[i] = function() {
      console.log('i=', i)
    }
  }

  return arr[0];
}
foo()();
