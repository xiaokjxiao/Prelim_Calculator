const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "×", "/", "-", "+"];
const hellos = ["Hello", "Hola", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요", "你好", "Привет", "Olá"];

let currentNumber = ""; 
let isOn = true;

const updateDisplay = () => {
  display.value = currentNumber || "0";
};

const clearAll = () => {
  currentNumber = "";
  updateDisplay();
};

const handleDelete = () => {
  if (currentNumber.length > 0) {
    currentNumber = currentNumber.toString.slice(0, -1); // Remove the last character (either number or operator)
  } else if (currentNumber[currentNumber.length - 1] === specialChars);
    currentNumber = currentNumber.toString.slice(0, -1);
    updateDisplay();
  };

const handleNumber = (number) => {
  if (!isOn) return;
  if (currentNumber.length >= 10) return;
  if (number === "." && currentNumber.includes(".")) return;
  currentNumber += number;
  updateDisplay();
};

const handleOperator = (op) => {              //change operators for
  if (!isOn || currentNumber === "") return;
  if (op === "%") {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
  } else if (op === "×") {
    currentNumber += "*"; 
  } else {
    currentNumber += op;
  }
  updateDisplay();
};

const calculate = () => {
  if (!isOn || currentNumber === "") return;
  try {
    currentNumber = eval(currentNumber).toString();
  } catch {
    currentNumber = "Error";
  }
  updateDisplay();
};

const handleHello = () => {
  if (!isOn) return;
  const randomIndex = Math.floor(Math.random() * hellos.length);
  clearAll();
  display.value = hellos[randomIndex];
};

const handleGoodbye = () => {
  display.value = "Good Bye!";
  disableButtons();
  setTimeout(() => {
    turnOffCalculator();
  }, 1000);
};

const turnOffCalculator = () => {
  isOn = false;
  disableButtons();
  display.value = "";
};

const turnOnCalculator = () => {
  isOn = true;
  enableButtons();
  clearAll();
};

const disableButtons = () => {
  buttons.forEach((button) => {
    if (button.dataset.value !== "AC") {
      button.disabled = true;
    }
  });
};

const enableButtons = () => {
  buttons.forEach((button) => {
    button.disabled = false;
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "hello") {
      handleHello();
    } else if (value === "bye") {
      handleGoodbye();
    } else if (specialChars.includes(value)) {
      handleOperator(value);
    } else if (value === "AC") {
      turnOnCalculator();
    } else if (value === "DEL") {
      handleDelete();
    } else if (value === "=") {
      calculate();
    } else {
      handleNumber(value);
    }
  });
});
