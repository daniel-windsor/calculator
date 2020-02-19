//Create event listeners
const elements = document.getElementsByClassName('grid-item')

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', log)
}

//Process key presses
let keyPress = []

function log(evt) {
  let key = evt.toElement.innerText

  switch (key) {
    case "CE":
      keyPress = []
      break;
    case "C":
      keyPress.pop()
      break;
    case "=":
      sanitise(keyPress)
      break;
    default:
      if (keyPress.length < 14) {
        keyPress.push(key)
      }
  }
  document.getElementsByClassName('grid-item-display')[0].innerHTML = keyPress.join('')

}

//Make sure equation won't break everything
function sanitise(arr) {

  //Make square root function
  if (arr.includes("√")) {
    let index = arr.indexOf("√")
    arr[index] = "Math.sqrt("

    let regex = /[+\-*\/]/

    for (let i = index; i < arr.length; i++) {
      console.log(i)
      if(regex.test(arr[i])) {
        arr.splice(i, 0, ")")
        break;
      } else if (i == arr.length - 1) {
        arr.push(")")
        break;
      }
    }
  }

  let equation = arr.join('').replace("x", "*")

  //Make sure equation doesn't end with an operator
  regex = /[^+\-*\/]$/
  if (regex.test(equation)) {
    solve(equation)
  }
}

//Solve!
function solve(equation) {

  let solution = eval(equation)

  //round solution if needed
  if (solution.toString().length > 15) {
    solution = solution.toPrecision(12)
  }

  document.getElementsByClassName('grid-item-display')[0].innerHTML = solution
  keyPress = [...solution.toString()]
}