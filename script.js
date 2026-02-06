// const container = document.querySelector(".container");
const display = document.querySelector(".display");
const keys = document.querySelectorAll(".key");

numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
operators = ["*", "/", "-", "+"];
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent;

    if (numbers.includes(value)) {
      display.textContent += value;
    } else if (value === ".") {
      if (display.textContent[display.textContent.length - 1] !== ".")
        display.textContent += value;
    } else if (operators.includes(value)) {
      if (
        !operators.includes(display.textContent[display.textContent.length - 1])
      )
        display.textContent += value;
    } else if (value === "=") {
      // operator goes here
    } else if (value === "C") {
      display.textContent = "";
    }
  });
});
