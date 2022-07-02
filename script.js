let calcArray = [];
let validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', 'x', '×', '/', '÷', '^', 'Backspace', '=', "Enter"];
let decimalEntered = false;
let equalsEntered = false;


window.onload = () => {
    document.querySelector('.all-buttons').focus();
    document.addEventListener('keydown', keyInput);
}

function keyInput(e) {
    /* TODO: CheckifEqualsEntered should only reset display if a digit is pressed next.
    Otherwise, if an operator is pressed first, the answer to previous calculation should become the first number in calcArray
    */
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

// perform mouseInput logic here
function mouseInput() {
    /* TODO: CheckifEqualsEntered should only reset display if a digit is pressed next.
    Otherwise, if an operator is pressed first, the answer to previous calculation should become the first number in calcArray
    */
    checkIfEqualsEntered();
    if (this.className === 'digits') {
        digitInput(this.value);
        updateDisplay(calcArray);
    } else if (this.className === 'operators' || this.className === 'operators tooltip') {
        if (validKeys.indexOf(this.value) > 10 && validKeys.indexOf(this.value) < (validKeys.length - 3)) { // all ValidKeys operators
            operatorInput(this.value);
            updateDisplay(calcArray);
        } else if (this.value === '.15') {
            if (validKeys.indexOf(calcArray[calcArray.length - 1]) > 10 && validKeys.indexOf(calcArray[calcArray.length - 1]) < (validKeys.length - 3)) {
                mathError('Err: needs a num');
            } else {
                calcArray[calcArray.length - 1] = fifteenPercent(calcArray[calcArray.length - 1]);
                updateDisplay(calcArray);
            }
        } else if (this.value === '.2') {
            if (validKeys.indexOf(calcArray[calcArray.length - 1]) > 10 && validKeys.indexOf(calcArray[calcArray.length - 1]) < (validKeys.length - 3)) {
                mathError('Err: needs a num');
            } else {
                calcArray[calcArray.length - 1] = twentyPercent(calcArray[calcArray.length - 1]);
                updateDisplay(calcArray);
            }
        } else if (this.value === '%') {
            if (validKeys.indexOf(calcArray[calcArray.length - 1]) > 10 && validKeys.indexOf(calcArray[calcArray.length - 1]) < (validKeys.length - 3)) {
                mathError('Err: needs a num');
            } else {
                calcArray[calcArray.length - 1] = percent(calcArray[calcArray.length - 1]);
                updateDisplay(calcArray);
            }
        } else if (this.value === '√') {
            if (validKeys.indexOf(calcArray[calcArray.length - 1]) > 10 && validKeys.indexOf(calcArray[calcArray.length - 1]) < (validKeys.length - 3)) {
                mathError('Err: needs a num');
            } else {
                calcArray[calcArray.length - 1] = squareRoot(calcArray[calcArray.length - 1]);
                updateDisplay(calcArray);
            }
        } else if (this.value === '±') {
            if (validKeys.indexOf(calcArray[calcArray.length - 1]) > 10 && validKeys.indexOf(calcArray[calcArray.length - 1]) < (validKeys.length - 3)) {
                mathError('Err: needs a num');
            } else {
                calcArray[calcArray.length - 1] = plusMinus(calcArray[calcArray.length - 1]);
                updateDisplay(calcArray);
            }
        }
    } else if (this.value === 'AC') {
        console.log('AC');
        allClear();
    } else if (this.value === 'C') {
        console.log('C');
        backspace();
    } else if (this.value === '=') {
        console.log("Will peform calculation now");
        updateResult('Coming soon...'); 
        equalsEntered = true;
    }
    //updateDisplay(calcArray) cannot go here as backspace and allClear reset display
}   

function digitInput(num) {
    // check if decimal has been pushed already, if so, ignore it
    if (num === '.') {
        if (decimalEntered) {
            mathError("Err: '.' already used");
            return;
        } else decimalEntered = true; 
    }
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

function doMath() {

}

function addition(num1, num2) {
    return (Number(num1) + Number(num2)).toString();
}

function subtraction(num1, num2) {
    return (Number(num1) - Number(num2)).toString();
}

function multiplication(num1, num2) {
    return (Number(num1) * Number(num2)).toString();
}

function division(num1, num2) {
    if (num2 == 0) mathError('Err: denom is 0');
    else return (Number(num1) / Number(num2)).toString();
}

function percent(num1) {
    return (Number(num1) / 100).toString();
}

function squareRoot(num1) {
    if (num1 < 0) mathError('Err: neg# root');
    return Math.sqrt(Number(num1)).toString();
}

function exponent(num1, num2) {
    if (num1 < 0 && num2 < 1) mathError('Err: neg# root');
    else return Math.pow(Number(num1), Number(num2)).toString();
}

function fifteenPercent(num1) {
    return (Number(num1) * (.15)).toFixed(2).toString();
}

function twentyPercent(num1) {
    return (Number(num1) * (.2)).toFixed(2).toString();
}

function plusMinus(num1) {
    return (Number(num1) * (-1)).toString();
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
    equalsEntered = false;
    decimalEntered = false;
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
    }
}

function mathError(message) {
    /* Message Max Length is 15: xxxxxxxxxxxxxxx */
    updateResult([message]);
}
