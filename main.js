//Create event listeners
const elements = document.getElementsByClassName('grid-item')

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', log)
}

//Process key presses
let keyPress = []

function log(evt) {
  let key = evt.target.innerHTML

  switch (key) {
    case "( )":
      let open = keyPress.lastIndexOf("(")
      let close = keyPress.lastIndexOf(")")
      if ((open > close) ? keyPress.push(")") : keyPress.push("("))
        break;
    case "√":
      keyPress.push("√")
      keyPress.push("(")
      break;
    case "C":
      keyPress = []
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

  let equation = [...arr]

  let regex = /[\d\(|\d√]/

  //Replace multiplication and division signs
  equation = equation.join('')
    .replace("x", "*")
    .replace("√", "Math.sqrt")

  //Make sure equation doesn't end with an operator
  regex = /[+\-*\/(√]$/
  if (!regex.test(equation)) {
    solve(equation)
  }
}

//Solve!
function solve(equation) {

  try {
    let solution = eval(equation)

    //round solution if needed
    if (solution.toString().length > 15) {
      solution = solution.toPrecision(12)
    }

    document.getElementsByClassName('grid-item-display')[0].innerHTML = solution
    keyPress = [...solution.toString()]

  } catch (e) {
    console.log(e)
  }
}