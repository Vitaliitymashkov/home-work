/**
 *** JavaScript primarily uses callbacks to handle asynchronous operations.​
 *** Callbacks are functions that are passed as arguments to other functions and 
 *** are executed after the completion of a specific task or operation.​

​ *** They enable you to define behavior that should occur when an asynchronous task finishes, 
 *** making it a cornerstone of non-blocking code.
 */

/* Simulate an asynchronous operation using setTimeout */
/* Let's recall:
 *** setTimeout is a WebAPI (Non-blocking I/O API) method available in run time environments of JavaScript ***
 */
 function simulateAsyncOperation(callback) {
    setTimeout(function () {
      console.log("Async operation complete");
      callback(); // Invoke the callback function
    }, 2000); // Simulate a 2-second delay
  }
  
  // Callback function to be executed after the async operation
  function onComplete() {
    console.log("Callback executed");
  }
  
  /* Let's now observe the execution of the following expressions.
   *** Let's try to forsee how the output would look like. ***
   */
  
  console.log("Start of the program");
  simulateAsyncOperation(onComplete);
  console.log("End of the program");

  /*

    1. “Start of the program”
    2. “End of the program”
    3. "Async operation complete "
    4. “Callback executed”
    
  */