

function createCounter() {
  let count = 0; // Private variable
  return  {
    increament : function(){
      count++;
      return count
    },

    decrease : function(){
      count--;
      return count
    },

    reset : function(){
      count = 0;
      return count
    }
}
}

const myCounter = createCounter();
console.log(myCounter.increament()); // 1
console.log(myCounter); // 2 (Remembers the previous count)
