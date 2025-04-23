let firstNum = null;
let secondNum = null;
let operator = null;
let displayVal = '';
let resultJustShown = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'Outrageous.';
    return a / b;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function roundResult(num) {
    return Math.round(num * 100000) / 100000;
}

function updateDecimalState() {
    decimalPoint.disabled = displayVal.includes('.');
}

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.number');
const decimalPoint = document.getElementById('decimal-point');
const backspace = document.getElementById('backspace');

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resultJustShown) {
            displayVal = '';
            resultJustShown = false;
        }
        displayVal += button.textContent;
        display.textContent = displayVal; 
        updateDecimalState();
    })
    decimalPoint.addEventListener('click', () => {
        if (resultJustShown){
            displayVal = '0';
            resultJustShown = false;
        }
        if (!displayVal.includes('.')) {
            displayVal += '.';
            display.textContent = displayVal;
        }
    })
})

const operatorButtons = document.querySelectorAll('.operator')

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayVal === '') {
            operator = button.textContent;
            return;
        }
        if (operator && displayVal !== '') {
            secondNum = parseFloat(displayVal);
            firstNum = operate(firstNum, secondNum, operator);
            display.textContent = roundResult(firstNum);
            displayVal = '';
            secondNum = null;
            updateDecimalState();
        } else if (displayVal !== '') {
            firstNum = parseFloat(displayVal);
            displayVal = '';
            updateDecimalState();
        }
        operator = button.textContent;
    })
})

const calculator = document.querySelector('.calculator');
const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
        if (operator && displayVal !== '') {
        secondNum = parseFloat(display.textContent);
        const result = operate(firstNum, secondNum, operator);
        if (typeof result === 'number') {
            displayVal = roundResult(result).toString();
            updateDecimalState();
            firstNum = result;
        } else {
            displayVal = result;
            firstNum = null;
            calculator.classList.add('shake');
            setTimeout(() => {
                calculator.classList.remove('shake');
            }, 300);
        }
        display.textContent = displayVal;
        resultJustShown = true;
        secondNum = null;
        operator = null;
    }
})

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    displayVal = '';
    firstNum = null;
    secondNum = null;
    operator = null;
    display.textContent = '';
    decimalPoint.disabled = false;
})

const allButons = document.querySelectorAll('button');
allButons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#fef0f3';
    })
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '';
    })
})

clear.addEventListener('mouseenter', () => {
    clear.style.backgroundColor = 'rgb(243, 183, 193)';
})
clear.addEventListener('mouseleave', () => {
    clear.style.backgroundColor = '';
})

backspace.addEventListener('click', () => {
    displayVal = displayVal.slice(0, -1);
    display.textContent = displayVal;
    updateDecimalState();
})

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if(!isNaN(key)) {
        if (resultJustShown) {
            displayVal = '';
            resultJustShown = false;
        }
        displayVal += key;
        display.textContent = displayVal;
        updateDecimalState();
    } else if(['+', '-', '*', '/'].includes(key)) {
        if (displayVal === '') {
            operator = button.textContent;
            return;
        }
        if (operator && displayVal !== '') {
            secondNum = parseFloat(displayVal);
            firstNum = operate(firstNum, secondNum, operator);
            display.textContent = roundResult(firstNum);
            displayVal = '';
            secondNum = null;
            updateDecimalState();
        } else if (displayVal !== '') {
            firstNum = parseFloat(displayVal);
            displayVal = '';
            updateDecimalState();
        }
        operator = key;
    } else if (key === 'Enter' || key === '=') {
        equals.click();
    } else if (key === 'Escape') {
        clear.click();
    } else if (key === '.') {
        decimalPoint.click();
    } else if (key === 'Backspace') {
        backspace.click();
    }
})