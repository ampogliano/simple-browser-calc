document.addEventListener('DOMContentLoaded', (event) => {
  // Declare all DOM variables to be used. Order not specific.
  const buttons = document.querySelector('.buttons')
  const operators = [].slice.call(document.querySelectorAll('.operator'))
  const utilities = [].slice.call(document.querySelectorAll('.utility'))
  const evaluator = document.querySelector('.evaluator')
  const screen = document.querySelector('.screen')

  // Declare variables that will hold values as the user uses the calculator.
  // Buffer is a string to avoid unnecessary type conversion - integers are 
  // parsed when performing arithmetic but otherwise it is acceptable for the
  // values stored here to be strings.
  let firstOperand = "0";
  let secondOperand = "0";
  let operator = null;
  let buffer = "0";


  // Function for handling clicks to the number buttons
  // Reworked this function with Miles to get rid of unnecessary code - there are 
  // only two cases that are important in terms of handling the buffer. As it's 
  // written this will prevent an extra 0 from being stored as the first 
  // number in the buffer when the buffer's value is updated to include non-zero
  // integers.
  function numberClick(event) {
    if (buffer === "0") {
      buffer = "";
    }

    buffer += event.target.innerHTML
    screen.innerHTML = buffer;
  }

  // Function to handle clicks of the 'backspace' and 'Clear' buttons
  function utilityClick(event) {
    switch (event.target.innerHTML) {
      case 'Clear':
        screen.innerHTML = "0";
        buffer = "0";
        operator = null;
        firstOperand = "0";
        secondOperand = "0";
        break;
      case ' ← ':
        if (buffer.length === 1) {
          screen.innerHTML = "0";
          buffer = "0";
        } else if (buffer.length > 1) {
          buffer = buffer.substring(0, buffer.length - 1);
          screen.innerHTML = buffer;
        }
        break;
    }
  }

  // Function for handling clicks of any of the operator buttons, which sets the
  // value of the operator variable.
  function operatorClick(event) {
    operator = event.target.innerHTML
    firstOperand = buffer;
    buffer = "0";
  }

  // Function for carrying out the arithmetic operation based on the selected 
  // operator.  Presently there is a bug that occurs when hitting the evaluate
  // button repeatedly. Because the value of secondOperand is set when the evaluate
  // button is clicked, AND the value of the bufer is set to the result of statement is
  // evaluated, entering "10 +" and pressing "evaluate" repeatedly will cause the 
  // successive values on the screen to be a doubling of the last value. The expected
  // behavior would be for the calculator to repeatedly add the last value on the screen
  // to itself until clear is pressed or the value is somehow modified.

  function evaluate(event) {
    secondOperand = buffer;
    let result;

    if (firstOperand && operator) {
      switch (operator) {
        case " ÷ ":
          result = parseInt(firstOperand) / parseInt(secondOperand);
          break;
        case " × ":
          result = parseInt(firstOperand) * parseInt(secondOperand);
          break;
        case " - ":
          result = parseInt(firstOperand) - parseInt(secondOperand);
          break;
        case " + ":
          result = parseInt(firstOperand) + parseInt(secondOperand);
          break;
      }
    } else if (firstOperand && operator && secondOperand === "0") {
        console.log('edge case')
    } else {
      // Do nothing if firstOperand and operator vars are not defined.
      return;
    }

    screen.innerHTML = result.toString();
    firstOperand = result.toString();
    secondOperand = "0";
    buffer = result.toString();
    
    console.log('first operand: ', firstOperand)
    console.log('type of first operand: ', typeof(firstOperand))
    console.log('operator: ', operator)
    console.log('type of operator: ', typeof(operator))
    console.log('second operand: ', secondOperand)
    console.log('type of second operand: ', typeof(secondOperand))
    console.log('buffer: ', buffer)
    console.log('type of buffer: ', typeof(buffer))
    console.log('result: ', result)
    console.log('type of result: ', typeof(result))
  }

  // Event handler for click events to the various categories of buttons
  buttons.addEventListener('click', (event) => {
    if (!isNaN(event.target.innerText)) {
      numberClick(event)
    } else if (utilities.includes(event.target)) {
      utilityClick(event)
    } else if (operators.includes(event.target)) {
      operatorClick(event)
    } else if (event.target === evaluator) {
      evaluate(event)
    }
  })
})