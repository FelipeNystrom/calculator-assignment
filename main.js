const screenValue = document.querySelector('#screenValue');

let query = [];
let printValue = [];
let printMessage = '';

document.addEventListener('click', e => {
  if (e.target.className === 'number-buttons') {
    buildQuery(parseInt(e.target.innerText));
    printOnScreen(parseInt(e.target.innerText));
  } else if (e.target.className === 'operator-buttons') {
    buildQuery(e.target.innerText);
    printOnScreen(e.target.innerText);
  }
});

const calc = (() => {
  /**
   * Memory is every previous calculation
   */
  let memory = [];
  /**
   * total is the current total
   */
  let total = 0;
  return {
    add: (a, ...b) => {
      let sum = b.reduce((sum, input) => {
        return (sum += input);
      });
      return a + sum;
    },
    subtract: (a, ...b) => {
      let sum = b.reduce((sum, input) => {
        return (sum += input);
      });
      return a - sum;
    },
    multiply: (a, ...b) => {
      let sum = b.reduce((sum, input) => {
        return (sum *= input);
      });
      return a * sum;
    },
    divide: (a, ...b) => {
      let sum = b.reduce((sum, input) => {
        return (sum *= input);
      });
      return a / sum;
    },
    clearMemory: () => {
      query = [];
      memory = [];
      printValue = [];
      total = 0;
      printMessage = total;
    },
    // setter function
    setTotal: value => {
      return (total = value);
    },
    // getter function
    getTotal: () => {
      return total;
    }
  };
})();

function calculate(a, operator, b) {
  if (operator === '+') {
    return calc.setTotal(calc.add(a, b));
  } else if (operator === '-') {
    return calc.setTotal(calc.subtract(a, b));
  } else if (operator === '*') {
    return calc.setTotal(calc.multiply(a, b));
  } else if (operator === '/') {
    return calc.setTotal(calc.divide(a, b));
  }
}

const buildQuery = input => {
  if (input !== '=') {
    query.push(input);
  } else {
    calculate(...query);
    printMessage = calc.getTotal();
  }
};

const printOnScreen = input => {
  printValue.push(input);
  for (val of printValue) {
    if (val === '=') {
      printMessage = calc.getTotal();
    } else if (val === 'C') {
      calc.clearMemory();
    } else {
      printMessage = ` ${val} `;
    }
  }
  screenValue.innerHTML = printMessage;
};
