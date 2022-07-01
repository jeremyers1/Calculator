let currentNum = 0;
let calcArray = [];
const calcButton = document.querySelectorAll('button');
for (let i = 0; i < calcButton.length; i++){
   calcButton[i].addEventListener('click', input); 
}

function input() {
    if (this.className === 'digits') {
        console.log(this.value, this.id);
calcArray.push(this.textContent);
    console.log(calcArray);
    }
        
        
       /* 

    allclear
    clear
    operators
    digits 
    decimal
    equals
    */
}
