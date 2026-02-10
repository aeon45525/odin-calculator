// const container = document.querySelector(".container");
const display = document.querySelector(".display");
const keys = document.querySelectorAll(".key");

let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operators = ["*", "/", "-", "+"];
let result;
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent;

    if (numbers.includes(value)) {
      display.textContent += value;
    }
    // decimal
    else if (value === ".") {
      if (display.textContent === "") display.textContent = "0.";
      else if (
        operators.includes(display.textContent[display.textContent.length - 1])
      )
        display.textContent += "0.";
      else if (checkDecimal(display.textContent)) display.textContent += value;
    }
    // operators
    else if (operators.includes(value)) {
      let parsed = toInt(display.textContent);
      if (parsed.number.length === 2) {
        result = calculate(parsed.number, parsed.operator);
        display.textContent = result + value;
      } else if (checkOperator(display.textContent, value)) {
        display.textContent += value;
      }
    } else if (value === "=") {
      // calculation
      let parsed = toInt(display.textContent);
      if (parsed.number.length === 2) {
        result = calculate(parsed.number, parsed.operator);
        display.textContent = result;
      }
    } else if (value === "C") {
      display.textContent = "";
      result = null;
    }
  });
});

function calculate(parsedNum, parsedOpe) {
  if (parsedOpe[0] === "+") return parsedNum[0] + parsedNum[1];
  else if (parsedOpe[0] === "-") return parsedNum[0] - parsedNum[1];
  else if (parsedOpe[0] === "*") return parsedNum[0] * parsedNum[1];
  else if (parsedOpe[0] === "/") {
    if (parsedNum[1] === 0) return "ERROR";
    else return parsedNum[0] / parsedNum[1];
  }
}

function toInt(display) {
  let character = "";
  let tempNumber = "";
  let number = [];
  let operator = [];

  for (let i = 0; i < display.length; i++) {
    character = display[i];

    if (operators.includes(character) && character !== "-") {
      number.push(tempNumber);
      operator.push(character);
      tempNumber = "";
    } else if (character === "-") {
      if (i === 0 || operators.includes(display[i - 1]))
        tempNumber += character;
      else if (display[i - 1] === "." || numbers.includes(display[i - 1])) {
        number.push(tempNumber);
        operator.push(character);
        tempNumber = "";
      }
    } else if (numbers.includes(character) || character === ".")
      tempNumber += character;
  }

  if (tempNumber !== "") number.push(tempNumber);

  NumFloat = number.map((n) => parseFloat(n));

  return {
    number: NumFloat,
    operator: operator,
  };
}

function checkDecimal(display) {
  let numbers = display.split(/[\+\-\*\/]/);
  let number = numbers[numbers.length - 1];

  return !number.includes(".");
}

function checkOperator(display, key) {
  let lastChar = display[display.length - 1];

  if (key === "-") {
    if (display === "") return true;
    else if (operators.includes(lastChar) && lastChar !== "-") return true;
    else if (numbers.includes(lastChar) || lastChar === ".") return true;
    else return false;
  } else {
    if (display === "" || operators.includes(lastChar)) return false;
    else return true;
  }
}
