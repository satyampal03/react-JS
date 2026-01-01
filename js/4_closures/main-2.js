function outer() {
  let counter = 0;  // lives in outer's lexical environment

  return function inner() {
  let counter = 0;  // lives in outer's lexical environment
    counter++ ;       // inner uses outer's variable
    return counter;
  };
}

const increment = outer();  // outer runs once
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 3
console.log(increment()); // 18