class Calculator {
  constructor(previousNumber, currentNumber) {
    this.previousNumber = previousNumber;
    this.currentNumber = currentNumber;
    this.clear();
  }
  clear() {
    this.currentElement = "";
    this.previousElement = "";
    this.operation = undefined;
  }
  delete() {
    this.currentElement = this.currentElement.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentElement.includes(".")) return;
    this.currentElement = this.currentElement.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentElement === "") return;
    if (this.previousElement !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousElement = this.currentElement;
    this.currentElement = "";
  }
  compute() {
    let computation;
    let prev = parseFloat(this.previousElement);
    let current = parseFloat(this.currentElement);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentElement = computation;
    this.operation = undefined;
    this.previousElement = "";
  }
  getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }
  updateDisplay() {
    this.currentNumber.innerText = this.getDisplayNumber(this.currentElement);
    if (this.operation != null) {
      this.previousNumber.innerText = `${this.getDisplayNumber(
        this.previousElement
      )} ${this.operation}`;
    }
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const equalBtn = document.querySelector("[data-equal]");
const currentNumber = document.querySelector("[data-current-number]");
const previousNumber = document.querySelector("[data-prevous-number]");

const calculator = new Calculator(previousNumber, currentNumber);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
