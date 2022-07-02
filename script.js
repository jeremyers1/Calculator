let calcArray = [];
let validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', 'x', '×', '/', '÷', '%', '^', 'Backspace', '=', "Enter"];
let decimalEntered = false;
let equalsEntered = false;


window.onload = () => {
    document.querySelector('.all-buttons').focus();
    document.addEventListener('keydown', keyInput);
}

function keyInput(e) {
    checkIfEqualsEntered();
    console.log(e); // to get e Object for information purposes
    // TODO: Stop key entry at 22 characters INCLUDING spaces added by array.join(). 
    // char count = (total # of digits) + ((total # of operators) * 3)
    // At max char count, output "Too Long" to result area
    if (validKeys.indexOf(e.key) != -1) { // make sure key entry is a valid calculator key
        if (validKeys.indexOf(e.key) < 11) { // was a number or decimal keyed in?
            digitInput(e.key);
            updateDisplay(calcArray);
        } else if (validKeys.indexOf(e.key) < (validKeys.length - 3)) { // all operators
            operatorInput(e.key);
            updateDisplay(calcArray);
        } else if (validKeys.indexOf(e.key) < (validKeys.length - 2)) { // Enable Backspace
            backspace();
        } else { // it's an '=' or 'Enter' and we need to calculate
            console.log("Will peform calculation now");
            updateResult('Coming soon...'); 
            equalsEntered = true;
        }
        //updateDisplay(calcArray) cannot go here due to backspace and allClear resetting screen
    }
}

const buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', mouseInput);
}

// perform mouseInput logic here, doing different things depending on what is clicked
function mouseInput() {
    if (this.className === 'digits') {
        digitInput(this.value);
        updateDisplay(calcArray);
    } else if (this.className === 'operators') {
        // Logic for buttons that are not in validKeys array
         if (validKeys.indexOf(this.value) > 10 && validKeys.indexOf(this.value) < (validKeys.length - 3)) { // all ValidKeys operators
             operatorInput(this.value);
             updateDisplay(calcArray);
        } else if (this.value === '.15') {

        } else if (this.value === '.2') {

        } else if (this.value === '√') {

        } else if (this.value === '±') {

        }
    } else if (this.className === 'allclear') {
        allClear();
    } else if (this.className === 'clear') {
        backspace();
    } else if (this.className === 'equals') {
        console.log("Will peform calculation now");
        updateResult('Coming soon...'); 
        equalsEntered = true;
    }
    //updateDisplay(calcArray) cannot go here as backspace and allClear reset display
}   

function digitInput(num) {
    // TODO: check if decimal has been pushed already, if so, ignore it
    calcArray.push(num);
    calcArray = calcArrayConcat(calcArray);
}

function operatorInput(oper) {
    // Check to see if previous key was an operator, if so, replace it.
    if (validKeys.indexOf(calcArray[calcArray.length - 1]) > 10 && validKeys.indexOf(calcArray[calcArray.length - 1]) < (validKeys.length - 3)) {
        calcArray.pop();
    }
    calcArray.push(oper);
}
    
// if preceding entry was also a digit, then user is still typing the number, so concat them
function calcArrayConcat(arr) {
    if (arr.length < 2) return arr;

    console.log(arr[arr.length - 1], arr[arr.length - 2]);
    console.log(typeof (arr[arr.length - 1]-0), typeof (arr[arr.length - 2]-0))
    if (validKeys.indexOf(arr[arr.length - 2]) < 11){ 
        arr[arr.length - 2] = "" + arr[arr.length - 2] + arr[arr.length - 1];
        arr.pop();
    }
    return arr;
}

function backspace() {
    calcArray[calcArray.length - 1] = calcArray[calcArray.length - 1].slice(0, -1);
    updateDisplay(calcArray);
    if (calcArray[calcArray.length - 1] === ''){
        calcArray.pop();
        updateDisplay(calcArray);
    }
    if (calcArray.length === 0) updateDisplay(['0']);
}

function allClear() {
    calcArray = [];
    updateDisplay(['Enter equation']);
    updateResult(['']);
}

function updateDisplay(arr) {
    console.log(arr);
    console.log(arr.join(' '));
    let equation = document.getElementById('user-input');
    equation.innerText = arr.join(' ');
}

function updateResult(num) {
    let result = document.getElementById('result');
    result.innerText = '= ' + num;
}

function checkIfEqualsEntered() {
    if (equalsEntered) {
        allClear();
        equalsEntered = false;
    }
}
