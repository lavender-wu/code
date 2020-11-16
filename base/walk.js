const target = document.getElementById('target');
console.log('target---', target);
target.style.cssText = `
  position: absolute;
  left: 200px;
  top: 200px;
  width: 10px;
  height: 10px;
  background: red;
`;
const walk = (direction, distance, callback) => {
  setTimeout(() => {
    let currentLeft = parseInt(target.style.left, 10);
    let currentTop = parseInt(target.style.top, 10);
    const shouldFinish = (direction === 'left' && currentLeft === -distance)
    || (direction === 'top' && currentTop === -distance);
    console.log('shouldFinish===', shouldFinish)
    if (shouldFinish) {
      callback && callback();
    } else {
      if (direction === 'left') {
        currentLeft --;
        target.style.left = `${currentLeft}px`;
      } else if (direction === 'top') {
        currentTop--;
        target.style.top = `${currentTop}px`;
      }
      walk(direction, distance, callback);
    }
  }, 20);
}

// walk('left', 20, () => {
//   walk('top', 50, () => {
//     walk('left', 30)
//   });
// });

const arr = ['a', 'b', 'c'];
function forOf() {
  for(item of arr) {
    console.log('item', item)
  }
}

forOf();