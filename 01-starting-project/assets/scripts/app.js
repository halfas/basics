let defaultResult = 0;
currentResult = defaultResult;
const logEntries = []

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
  console.log(logEntries)
}

function summ() {
  const enteredNumber = getEnteredNumber();
  const initialResult = currentResult;
  currentResult += enteredNumber;
  logs('+', initialResult, enteredNumber);
  addLogToArray('Summ', initialResult, enteredNumber, currentResult);
}

function substract() {
  const enteredNumber = getEnteredNumber();
  const initialResult = currentResult;
  currentResult -= parseInt(userInput.value);
  logs('-', initialResult, enteredNumber);
  addLogToArray('Subtract', initialResult, enteredNumber, currentResult);
}

function devide() {
  const enteredNumber = getEnteredNumber();
  const initialResult = currentResult;
  currentResult /= parseInt(userInput.value);
  logs('/', initialResult, enteredNumber);
  addLogToArray('Devide', initialResult, enteredNumber, currentResult);
}

function multi() {
  const enteredNumber = getEnteredNumber();
  const initialResult = currentResult;
  currentResult *= parseInt(userInput.value);
  logs('*', initialResult, enteredNumber);
  addLogToArray('Milti', initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener('click', summ);
subtractBtn.addEventListener('click', substract);
divideBtn.addEventListener('click', devide);
multiplyBtn.addEventListener('click', multi)


