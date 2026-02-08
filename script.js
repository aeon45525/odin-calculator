// const container = document.querySelector(".container");
const display = document.querySelector(".display");
const keys = document.querySelectorAll(".key");

let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operators = ["*", "/", "-", "+"];
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
    //   else if (checkDecimal(display.textContent)) display.textContent += value;
    // }
    // operators
    else if (operators.includes(value)) {
      if (checkOperator(display.textContent, value)) {
        display.textContent += value;
      }
    } else if (value === "=") {
      // operator goes here
    } else if (value === "C") {
      display.textContent = "";
    }
  });
});

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
