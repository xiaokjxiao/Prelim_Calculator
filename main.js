const display = document.querySelector(".display")
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "×", "/", "-", "+"];
const hellos = ["Hello", "Hola", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요", "你好", "Привет", "Olá"];

let currentNumber = ""; // Track the current number being entered
let previousNumber = null; // Store the previous number for calculations
let operation = null; // Keep track of the pending operation
let isOn = true; // Track if the calculator is on or off

const updateDisplay = () => {
  if (operation && previousNumber !== null) {
    display.value = `${previousNumber} ${operation} ${currentNumber}`; // Show the equation
  } else {
    display.value = currentNumber || "0"; // Display 0 if currentNumber is empty
  }
};

const clearAll = () => {
  currentNumber = "";
  previousNumber = null;
  operation = null;
  updateDisplay();
};

const handleDelete = () => {
  if (currentNumber) {
    currentNumber = currentNumber.slice(0, -1); // Remove the last character
    updateDisplay();
  }
};

const handleNumber = (number) => {
  if (!isOn) return; // Prevent input if calculator is off
  if (number === "." && currentNumber.includes(".")) return; // Prevent multiple decimals
  currentNumber += number;
  updateDisplay();
};

const handleOperator = (op) => {
  if (!isOn || currentNumber === "") return; // Prevent operator at the beginning or when calculator is off

  if (previousNumber === null) {
    previousNumber = parseFloat(currentNumber); // Convert to a number
  } else {
    calculate(); // Perform the previous operation if a number is already present
  }
  operation = op;
  currentNumber = ""; // Reset current number for next operand
  updateDisplay(); // Update display to show the equation
};

const calculate = () => {
  if (previousNumber === null || operation === null || currentNumber === "") {
    return; // Handle incomplete calculations
  }

  const current = parseFloat(currentNumber);

  let result;
  switch (operation) {
    case "+":
      result = previousNumber + current;
      break;
    case "-":
      result = previousNumber - current;
      break;
    case "×":
      result = previousNumber * current;
      break;
    case "/":
      if (current === 0) {
        alert("Error: Division by zero");
        return; // Prevent division by zero error
      }
      result = previousNumber / current;
      break;
    case "%":
      result = previousNumber * (current / 100);
      break;
    default:
      return; // Handle unexpected operations
  }

  previousNumber = result;
  currentNumber = result.toString(); // Convert result back to string
  operation = null;
  updateDisplay(); // Update display
};

const handleHello = () => {
  if (!isOn) return; // Prevent "hello" messages if calculator is off
  const randomIndex = Math.floor(Math.random() * hellos.length);
  display.value = hellos[randomIndex];
};

const handleGoodbye = () => {
  display.value = "Goodbye"; // Display Goodbye message
  setTimeout(() => {
    turnOffCalculator(); // Turn off the calculator after displaying the message
  }, 1000); // Delay for 1 second before turning off
};

const handleEquals = () => {
  if (!isOn) return; // Prevent calculations if calculator is off
  calculate();
};

// Turn off the calculator
const turnOffCalculator = () => {
  isOn = false;
  disableButtons();
  display.value = ""; // Clear the display when off
};

// Turn on the calculator
const turnOnCalculator = () => {
  isOn = true;
  enableButtons();
  clearAll(); // Reset the calculator when turning on
};

// Disable all buttons except for AC
const disableButtons = () => {
  buttons.forEach((button) => {
    if (button.dataset.value !== "AC") {
      button.disabled = true; // Disable all buttons except AC
    }
  });
};

// Enable all buttons
const enableButtons = () => {
  buttons.forEach((button) => {
    button.disabled = false; // Enable all buttons
  });
};

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value; // Use data-value instead of textContent

    if (value === "hello") {
      handleHello();
    } else if (value === "bye") {
      handleGoodbye(); // Call the updated handleGoodbye function
    } else if (specialChars.includes(value)) {
      handleOperator(value);
    } else if (value === "AC") {
      turnOnCalculator(); // Turn on calculator with AC
    } else if (value === "DEL") {
      handleDelete();
    } else if (value === "=") {
      handleEquals();
    } else {
      handleNumber(value);
    }
  });
});