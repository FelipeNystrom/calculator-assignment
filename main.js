const screenValue = document.querySelector('#screenValue');

const globalVar = {
  printValue: [],
  query: [],
  printMessage: ''
};

class Calculation {
  constructor() {
    this.total = 0;
  }

  add(a, ...b) {
    let sum = b.reduce((sum, input) => {
      return (sum += input);
    });
    return a + sum;
  }
  subtract(a, ...b) {
    let sum = b.reduce((sum, input) => {
      return (sum += input);
    });
    return a - sum;
  }
  multiply(a, ...b) {
    let sum = b.reduce((sum, input) => {
      return (sum *= input);
    });
    return a * sum;
  }
  divide(a, ...b) {
    let sum = b.reduce((sum, input) => {
      return (sum *= input);
    });
    return a / sum;
  }
  // setter function
  setTotal(value) {
    return (this.total = value);
  }
  // getter function
  getTotal() {
    return this.total;
  }
}

const calc = new Calculation();

const clearMemory = () => {
  globalVar.query = [];
  globalVar.printValue = [];
  calc.setTotal(0);
  globalVar.printMessage = calc.getTotal();
};

const calculate = (a, operator, b) => {
  if (operator === '+') {
    return calc.setTotal(calc.add(a, b));
  } else if (operator === '-') {
    return calc.setTotal(calc.subtract(a, b));
  } else if (operator === '*') {
    return calc.setTotal(calc.multiply(a, b));
  } else if (operator === '/') {
    return calc.setTotal(calc.divide(a, b));
  }
};

const buildQuery = input => {
  if (input !== '=') {
    globalVar.query.push(input);
  } else {
    calculate(...globalVar.query);
    globalVar.printMessage = calc.getTotal();
  }
};

const printOnScreen = input => {
  globalVar.printValue.push(input);
  for (val of globalVar.printValue) {
    if (val === '=') {
      globalVar.printMessage = calc.getTotal();
    } else if (val === 'C') {
      clearMemory();
    } else {
      globalVar.printMessage = ` ${val} `;
    }
  }
  screenValue.innerHTML = globalVar.printMessage;
};

document.addEventListener('click', e => {
  if (e.target.className === 'number-buttons') {
    buildQuery(parseInt(e.target.innerText));
    printOnScreen(parseInt(e.target.innerText));
  } else if (e.target.className === 'operator-buttons') {
    buildQuery(e.target.innerText);
    printOnScreen(e.target.innerText);
  }
});
