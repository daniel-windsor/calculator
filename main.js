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
      solve(keyPress)
      break;
    default:
      if (keyPress.length < 16) {
        keyPress.push(key)
      }
  }

  document.getElementsByClassName('grid-item-display')[0].innerHTML = keyPress.join('')
}

function solve(arr) {

}