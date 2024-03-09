function calculator(firstNumber, secondNumber, operation) {
    let result = 0;
    firstNumber = prompt("enter first number");
    secondNumber = prompt("enter second number");
    operation = prompt("enter operation");
    if (operation === "+") {
        result = parseInt(firstNumber) + parseInt(secondNumber);
    } else if (operation === "-") {
        result = parseInt(firstNumber) - parseInt(secondNumber);
    } else if (operation === "*") {
        result = parseInt(firstNumber) * parseInt(secondNumber);
    } else if (operation === "/") {
        result = parseInt(firstNumber) / parseInt(secondNumber);
    }
    console.log(result);
}

calculator();
