"use strict";
// Arrays to hold consecutive values and operations
var operands = [];
var operations = [];

// Assign onlick functions to buttons
window.onload = function() {
  document.getElementById("calc-clear").onclick = clearClick;
  document.getElementById("calc-equals").onclick = equalsClick;
  document.getElementById("calc-decimal").onclick = decClick;
  var numbers = document.getElementsByClassName("calc-num");
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = numClick;
  }
  var operators = document.getElementsByClassName("calc-operator");
  for (let i = 0; i < operators.length; i++) {
    operators[i].onclick = opClick;
  }
}

var clearClick = function() {
  // Set display to 0, clear global variables
  document.getElementById("calc-display").innerHTML = "0";
  operands = [];
  operations = [];
}

var numClick = function(event) {
  // If display value is zero replace with button value
  if (document.getElementById("calc-display").innerHTML == 0) {
    document.getElementById("calc-display").innerHTML = parseInt(event.target.innerHTML);

  // If display ends with .0, remove 0 and then concatenate
  } else if (document.getElementById("calc-display").innerHTML.includes(".") && document.getElementById("calc-display").innerHTML % 1 == 0) {
    document.getElementById("calc-display").innerHTML = document.getElementById("calc-display").innerHTML.slice(0, -1) + parseInt(event.target.innerHTML);
 
  // Concatenate value otherwise
  } else {
    document.getElementById("calc-display").innerHTML += parseInt(event.target.innerHTML);
  }
}

var decClick = function() {
  // Concatenate .0 value to display or replace 0 with 0.0
  if (document.getElementById("calc-display").innerHTML == 0) {
    document.getElementById("calc-display").innerHTML = "0.0";
  } else {
    document.getElementById("calc-display").innerHTML += ".0";
  }
}

var opClick = function(event) {
  // Add display value to operand array and reset to 0
  operands.push(parseFloat(document.getElementById("calc-display").innerHTML));
  document.getElementById("calc-display").innerHTML = 0;
  // Add operation symbol to operation array
  if (event.target.innerHTML == "+") {
    operations.push("+");
  } else if (event.target.innerHTML == "-") {
    operations.push("-");
  } else if (event.target.innerHTML == "x") {
    operations.push("x");
  } else if (event.target.innerHTML == "/") {
    operations.push("/");
  }
}

var equalsClick = function() {
  // If no operands or operations, clear and return
  if (operands.length == 0 || operations.length == 0) {
    clearClick();
    return;
  }
  // First operand begins running total
  var runningTotal = operands[0];

  for (let i = 0; i < operands.length; i++) {
    var nextOperand;
    // Use display value as last operand, otherwise use the next operand in the array
    if (i + 1 == operands.length) {
      nextOperand = parseFloat(document.getElementById("calc-display").innerHTML);
    } else {
      nextOperand = parseFloat(operands[i + 1]);
    }
    // Perform calculation based on current operation symbol
    if (operations[i] == "+") {
      runningTotal += nextOperand;
    } else if (operations[i] == "-") {
      runningTotal -= nextOperand;
    } else if (operations[i] == "x") {
      runningTotal *= nextOperand;
    } else if (operations[i] == "/") {
      if (nextOperand == 0) {
        // Divide by zero error
        alert("Divide By Zero Error");
        clearClick();
        return;
      }
      runningTotal /= nextOperand;
    }

  }
  // Set final total to display value
  document.getElementById("calc-display").innerHTML = runningTotal;
  // Clear global variables
  operands = [];
  operations = [];
}
