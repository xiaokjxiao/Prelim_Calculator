const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+"];
const hellos = ["Hello", "Hola", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요", "你好", "Привет", "Olá", "Kamusta"];

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
  currentNumber = currentNumber.slice(0, -1); //clears the last character
  updateDisplay();
};

const handleNumber = (number) => {
  if (!isOn) return;
  if (currentNumber.length >= 10) return; // 10 charac only
  if (number === "." && currentNumber.includes(".")) return; // avoid many decimal
  currentNumber += number;
  updateDisplay();
};

const handleOperator = (op) => {
  if (!isOn || currentNumber === "") return;
  const lastChar = currentNumber[currentNumber.length - 1];
  

  if (specialChars.includes(lastChar)) {
    if ((op === "-" && lastChar !== "-") || op === "+" && lastChar !== "+"){
      currentNumber += op;  // checks if lastcharacter is negative and a "-" and "+", if yes then it allows to equate a positive and negative integer
    } else {
      currentNumber = currentNumber.slice(0, -1) + op;  // if not it replaces
    }
  } else {
    currentNumber += op;
  }

  updateDisplay();
};

const calculate = () => {
  if (!isOn || currentNumber === "") return;
  try {
    if (currentNumber.includes("/0") || currentNumber.includes("%0")) {
      currentNumber = "Error"; // error
    } else {
      currentNumber = eval(currentNumber).toString();
    }
  } catch {
    currentNumber = "Error";
  }
  updateDisplay();
};

const handleHello = () => {
  if (!isOn) return;
  const randomIndex = Math.floor(Math.random() * hellos.length);
  clearAll(); // clears all numbers when hello is pressed
  display.value = hellos[randomIndex];
};

const handleGoodbye = () => {
  display.value = "Good Bye!";
  disableButtons(); //disable buttons when displaying goodbye
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
