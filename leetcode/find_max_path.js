function findMaxPath() {
  console.log(arguments)
  var sum = 0
  for(var i = 0; i < arguments.length; i++){
    sum += arguments[i]
  }
  return sum;
}

var result = findMaxPath(1, 2, 3, 4, 5)
// console.log(result)
var message = 'out'
class Message {
  message = "Howdy"

  greet() { console.log(this) }
}

const greeting = new Message()

greeting.greet() // Howdy
console.log(greeting.message) // Private name #message is not defined