let currentNum = 0;
let calcArray = [];

window.onload = () => {
    document.querySelector('.all-buttons').focus();
    document.addEventListener('keypress', keyInput);
}

const calcMouse = document.querySelectorAll('button');
for (let i = 0; i < calcMouse.length; i++){
    calcMouse[i].addEventListener('click', mouseInput);
}

function mouseInput() {
    if (this.className === 'digits') {
    calcArray.push(this.textContent);
    console.log(calcArray);
    }
}   

function keyInput(e) {
    console.log(e);
    let validkeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', '%', '^', '='];
    if (validkeys.indexOf(e)) {
    calcArray.push(e.key);
    console.log(calcArray);
    }
}

 
       /* 

    allclear
    clear
    operators
    digits 
    decimal
    equals
    */

