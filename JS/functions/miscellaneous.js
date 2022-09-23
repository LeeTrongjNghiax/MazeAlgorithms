randomInt = (start, stop) => Math.round(Math.random() * (stop - start) + start);

randomOdd = (start, stop) => {
  let random = Math.round(Math.random() * (stop - start) + start);
  while (random % 2 == 0)
    random = Math.round(Math.random() * (stop - start) + start);
  return random;
}

randomFloat = (start, stop) => Math.random() * (stop - start) + start;

isNumeric = str => {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

sleep = milliseconds => {
  const date = Date.now();
  let currentDate = null;
  
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

unique = (a, fn) => {
  if (a.length === 0 || a.length === 1) {
    return a;
  }
  if (!fn) {
    return a;
  }

  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (fn(a[i], a[j])) {
        a.splice(i, 1);
      }
    }
  }
  return a;
}

solvingSystemsLinearEquations2Unknowns = (matrix, result) => {
  let det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  if (det == 0) return null;

  let adjointMatrix = [
    [matrix[1][1], -matrix[0][1]],
    [-matrix[1][0], matrix[0][0]]
  ]
  for (let i = 0; i < adjointMatrix.length; i++) {
    for (let j = 0; j < adjointMatrix[i].length; j++) {
      adjointMatrix[i][j] *= 1/det;
    }
  }
  let x = adjointMatrix[0][0] * result[0][0] + adjointMatrix[0][1] * result[1][0];
  let y = adjointMatrix[1][0] * result[0][0] + adjointMatrix[1][1] * result[1][0];
  return {
    x: x,
    y: y
  }
}

let exponent = function(a, n) {
  if (n === 0) return 1;
  return a * exponent(a, n - 1);
};

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

varToString = variable => Object.keys(variable)[0]