let currentNum = 0;
let calcArray = [];

window.onload = () => {
    document.querySelector('.all-buttons').focus();
    document.addEventListener('keydown', keyInput);
}

function keyInput(e) {
    console.log(e);
    // TODO: Allow "backspace" as a valid key
    let validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', '%', '^', 'Backspace', '=', "Enter"];
    if (validKeys.indexOf(e.key) != -1) { // make sure key entry is a valid calculator key
        if (validKeys.indexOf(e.key) < 11) { // was a number or decimal keyed in?
            // TODO: check if decimal has been pushed already, if so, ignore it
            calcArray.push(e.key);
            calcArray = calcArrayConcat(calcArray, validKeys);
            console.log(calcArray); // check to make sure number was entered properly
        } else if (validKeys.indexOf(e.key) < (validKeys.length - 3)) { // all operators
            // Check to see if previous key was an operator, if so, replace it.
            if (validKeys.indexOf(calcArray[calcArray.length - 1]) > 10 && validKeys.indexOf(calcArray[calcArray.length - 1]) < 17) {
                console.log(calcArray);
                calcArray.pop();
            }
            calcArray.push(e.key);
            console.log(calcArray); // checks to make sure operation was entered properly
        } else if (validKeys.indexOf(e.key) < (validKeys.length - 2)) { // Backspace
            console.log('Array Length: ', calcArray.length);
            calcArray[calcArray.length - 1] = calcArray[calcArray.length - 1].slice(0, -1);
            if (calcArray[calcArray.length - 1] === '') calcArray.pop();
            console.log(calcArray);
        } else { // it's an '=' or 'Enter' and we need to calculate
            console.log("Will peform calculation now");
        }
    }
}

const buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', mouseInput);
}

function mouseInput() {
   
   /* perform mouseInput logic here, doing different things depending on what is entered
    allclear
    clear
    operators
    digits 
    decimal
    equals
    */
     if (this.className === 'digits') {
         calcArray.push(this.textContent);
         calcArray = calcArrayConcat(calcArray);
    }
    console.log(calcArray);
}   


    
// if preceding entry was also a digit, then user is still typing the number, so concat them
function calcArrayConcat(arrC, arrK) {
    if (arrC.length < 2) return arrC;

    console.log(arrC[arrC.length - 1], arrC[arrC.length - 2]);
    console.log(typeof (arrC[arrC.length - 1]-0), typeof (arrC[arrC.length - 2]-0))
    if (arrK.indexOf(arrC[arrC.length - 2]) < 11){ 
        arrC[arrC.length - 2] = "" + arrC[arrC.length - 2] + arrC[arrC.length - 1];
        arrC.pop();
    }
    return arrC;
}