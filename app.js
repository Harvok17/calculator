const buttons = document.querySelector(".button-grid");
const dot = document.querySelector(".dot");
const input = document.querySelector(".input-number");
const addBtn = document.querySelector(".add");
const subtractBtn = document.querySelector(".subtract");
const multiplyBtn = document.querySelector(".multiply");
const divideBtn = document.querySelector(".divide");
const equalsBtn = document.querySelector(".equals");
const plusSymbol = "(\u002B)";
const minusSymbol = "(\u2212)";
const timesSymbol = "(\u2715)";
const divideSymbol = "(\u00F7)";
let mode = document.querySelector(".mode");
let currentValueIndicator = document.querySelector(".current-value");
let firstInput;
let secondInput;
let inputValue = "";
let operationSelected;
let mathFunc;

buttons.addEventListener("click", modifyNumbers);
addBtn.addEventListener("click", addNumbers);
subtractBtn.addEventListener("click", subrtactNumbers);
multiplyBtn.addEventListener("click", multiplyNumbers);
divideBtn.addEventListener("click", divideNumbers);
equalsBtn.addEventListener("click", function () {
  if (firstInput == undefined) {
    return;
  }
  operationSelected();
  if(mathFunc == divide && secondInput == 0){
    firstInput = "Infinity";
  } else if (mathFunc == multiply && secondInput == 0){
    firstInput = 0;
  }
  if (secondInput) {
    firstInput = operate(firstInput, secondInput, mathFunc);
  }
  updateCurrentValues();
});

window.addEventListener("keyup",function(e){
  const key = document.querySelector(`button[data-key="${e.key}"]`);
  if(!key) return;
  if(key.className === "number"){
    inputValue += key.value;
    input.textContent = inputValue;
  }else if (key.className === "backspace"){
    const inputLess = inputValue.split("");
    inputLess.pop();
    inputValue = inputLess.join("");
    input.textContent = inputValue;
    if (!inputValue) {
      input.textContent = "0";
    } else if (!inputValue.includes(".")) {
      dot.disabled = false;
    }
  }else if (key === dot){
    if(key.disabled){
      return;
    } else{
      inputValue += ".";
      key.disabled = true;
    }
  }  
});

function modifyNumbers(e) {
  if (e.target.className == "number") {
    inputValue += e.target.value;
    input.textContent = inputValue;
  } else if (e.target.className == "backspace") {
    const inputLess = inputValue.split("");
    inputLess.pop();
    inputValue = inputLess.join("");
    input.textContent = inputValue;
    if (!inputValue) {
      input.textContent = "0";
    } else if (!inputValue.includes(".")) {
      dot.disabled = false;
    }
  } else if (e.target.className == "percent") {
    if(!inputValue){return}
    if (inputValue.includes(".")) {
      inputValue = (parseFloat(inputValue) / 100).toString();
    } else {
      inputValue = (parseInt(inputValue) / 100).toString();
    }
    dot.disabled = true;
    input.textContent = inputValue;
  } else if (e.target == dot) {
    inputValue += ".";
    e.target.disabled = true;
  } else if (e.target.className == "clear") {
    inputValue = "";
    input.textContent = "0";
    currentValueIndicator.textContent = "";
    dot.disabled = false;
    firstInput = undefined;
    secondInput = undefined;
    mode.textContent = "";
    operator = undefined;
  }
}

function addNumbers() {
  equalsBtn.click();
  processOperation(addNumbers,plusSymbol);
  mathFunc = add;
}

function subrtactNumbers(){
  equalsBtn.click();
  processOperation(subrtactNumbers,minusSymbol);
  mathFunc = subtract;
}

function multiplyNumbers(){
  equalsBtn.click();
  processOperation(multiplyNumbers,timesSymbol);
  mathFunc = multiply;
}

function divideNumbers (){
  equalsBtn.click();
  processOperation(divideNumbers,divideSymbol);
  mathFunc = divide;
}

function processOperation(operation,symbol){
  operationSelected = operation;
  mode.textContent = symbol;
  addValue();
}

function operate(firstNum, secondNum, operation) {
  return operation(firstNum, secondNum);
}

function addValue() {
  if (firstInput == undefined) {
    firstInput = inputValue;
    if (firstInput.includes(".")) {
      firstInput = parseFloat(firstInput);
    } else {
      firstInput = parseInt(firstInput);
    }
    inputValue = "";
  } else if (secondInput == undefined || isNaN(secondInput)) {
    secondInput = inputValue;
    if (secondInput.includes(".")) {
      secondInput = parseFloat(secondInput);
    } else {
      secondInput = parseInt(secondInput);
    }
    inputValue = "";
  }
  dot.disabled = false;
}

function updateCurrentValues() {
  secondInput = undefined;
  currentValueIndicator.textContent = firstInput;
  input.textContent = firstInput;
  operationSelected = undefined;
  mode.textContent = "";
}

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};
