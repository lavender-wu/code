const dom = document.getElementById('target');

function replace(node, data) {
  console.log('replace---', attributesArray);
  
  if (node.nodeType === 1) {
    let attributesArray = node.attributes;
    console.log('node---', attributesArray);
    Array.from(attributesArray).map(attr => {
      let attributeName = attr.name;
      let attributeValue = attr.value;
      console.log('node---', attributesArray, attr.name, attr.value);

      if (name.includes('v-')) {
        node.value = data[attributeValue];
      }
      node.addEventListener('input', e => {
        let newValue = e.target.value;
        data[attributeValue] = newValue;
      });
    })
  }
}
console.log('dom---', dom.chilNodes, dom.childNodes);

if (dom.chilNodes && dom.childNodes.length) {
  replace(node);
}
