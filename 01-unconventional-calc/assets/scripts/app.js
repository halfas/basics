let defaultResult = 0;
currentResult = defaultResult;
const logEntries = [];

function getEnteredNumber() {
  return parseInt(userInput.value);
}

function logs(operator, resultBefore, calcNumber) {
  const calcDescription = `${resultBefore} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function addLogToArray(operatorID, prevResult, enteredNumber, endResult) {
  const logEntry = {
    operator: operatorID,
    prevResult: prevResult,
    number: enteredNumber,
    result: endResult
  };
  logEntries.push(logEntry);
}

function calcResult(calcType) {
  if (calcType !== 'Summ' && calcType !== 'subtract' && calcType !== 'Divide' && calcType !== 'Multi') {
    return;
  }
  const enteredNumber = getEnteredNumber();
  const initialResult = currentResult;
  let mathOperator;
  if (calcType === 'Summ') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calcType === 'Subtract') {
    currentResult -= parseInt(userInput.value);
    mathOperator = '-';
  } else if (calcType === 'Divide') {
    currentResult /= enteredNumber;
    mathOperator = '/';
  } else if (calcType === 'Multi') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  }
  logs(mathOperator, initialResult, enteredNumber);
  addLogToArray(calcType, initialResult, enteredNumber, currentResult);
}

function summ() {
  calcResult('Summ');
}

function substract() {
  calcResult('Subtract');
}

function devide() {
  calcResult('Divide');
}

function multi() {
  calcResult('Multi');
}

addBtn.addEventListener('click', summ);
subtractBtn.addEventListener('click', substract);
divideBtn.addEventListener('click', devide);
multiplyBtn.addEventListener('click', multi);