const screenValue = document.querySelector('#screenValue');

let query = [];
let printValue = [];
let printMessage = '';
/**
 * Memory is every previous calculation
 */
let memory = [];
/**
 * total is the current total
 */
let total = 0;

document.addEventListener('click', e => {
  if (e.target.className === 'number-buttons') {
    buildQuery(parseInt(e.target.innerText));
    printOnScreen(parseInt(e.target.innerText));
  } else if (e.target.className === 'operator-buttons') {
    buildQuery(e.target.innerText);
    printOnScreen(e.target.innerText);
  }
});

function add(a, ...b) {
  let sum = b.reduce((sum, input) => {
    return (sum += input);
  });
  return a + sum;
}

function subtract(a, ...b) {
  let sum = b.reduce((sum, input) => {
    return (sum += input);
  });
  return a - sum;
}

function multiply(a, ...b) {
  let sum = b.reduce((sum, input) => {
    return (sum *= input);
  });
  return a * sum;
}

function divide(a, ...b) {
  let sum = b.reduce((sum, input) => {
    return (sum *= input);
  });
  return a / sum;
}

function getTotal(sum) {
  total = sum;
}

function clearMemory() {
  query = [];
  memory = [];
  printValue = [];
  total = 0;
  printMessage = total;
}

function calculate(a, operator, b) {
  if (operator === '+') {
    let total = add(a, b);
    memory.push(total);
    return getTotal(total);
  } else if (operator === '-') {
    let total = subtract(a, b);
    memory.push(total);
    return getTotal(total);
  } else if (operator === '*') {
    let total = multiply(a, b);
    memory.push(total);
    return getTotal(total);
  } else if (operator === '/') {
    let total = divide(a, b);
    memory.push(total);
    return getTotal(total);
  }
}

const buildQuery = input => {
  if (input !== '=') {
    query.push(input);
  } else {
    calculate(...query);
    printMessage = total;
  }
};

const printOnScreen = input => {
  printValue.push(input);
  for (val of printValue) {
    if (val === '=') {
      printMessage = total;
    } else if (val === 'C') {
      clearMemory();
    } else {
      printMessage = ` ${val} `;
    }
  }
  screenValue.innerHTML = printMessage;
};

let searchString = '1';

const compare = strToSearch => {
  let operators = '+-*/1234567890';
  let everyChar = operators.split('');
  return everyChar.find(val => val === strToSearch);
};
