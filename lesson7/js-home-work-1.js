/**
 Understanding data types is fundamental in JavaScript. 
 Let's explore the two main categories of data types: primitives and complex types.​

 Very simple way of discerning a primitive type of a complex type is by understanding 
 how many values the type is representing.​

 There is a simple rule:​
    1. If the type is meant to represent only one value, then it is a primitive type.​
    2. If the type is meant to represent more than one value, then it is a complex type.
 */

/* Primitive types 
    undefined: Represents a variable that has been declared but hasn't been assigned a value.​
    null: Represents an intentional absence of any object value or no value at all.​
    boolean: Represents a true or false value.​
    number: Represents both integer and floating-point numbers.​
    string: Represents a sequence of characters enclosed in single or double quotes.​
    symbol (ES6): Represents unique and immutable values, often used as object property keys.
*/
let myNumber = 1;
let myString = "The quick brown fox jumps over the lazy dog";
let myBoolean = true || false; // || is the logical OR operator; other logical operators are: && logical AND and ! logical NOT;

/**
 * Let's keep symbol primitive out of the scope of this presentation,
 * due to its limited use and having to use more advanced concepts to understand it.
 */

/* Complex types 
    Objects: Represents a collection of key-value pairs (properties) and is one of the most versatile data types. 
    Arrays: Represents an ordered list of values, indexed by numbers, and often used for collections.​
    Functions: Represents a reusable block of code.​
*/
/* Please observe the deep nested data structure possibility */
const myObject = {
  key: "value",
  key_2: [1, 2, 3],
  key_3: {
    key_4: {},
  },
};

const myArray = ["1", "two", true, Symbol()];

/* As expected, 
   the JavaScript language, gives us the posibility of 
   locating and acquiring (deep nested) property values or indexed values.
   1. For the arrays, having in mind that they are INDEXED data structures, the way of acquiring an array member
      is by finding it by its index. 
      NEVER FORGET: Arrays are zero indexed data structures.
   2. As for the Objects, since they are key-value pairs, the acquiring of a member is by using the keys.
      There are two syntax options: 
       - dot-notation and 
       - bracket-notation.
*/

/* Acquire the second element of the array myVarsArray and assign it to the variable with name myVar */
const myVarsArray = ["var_1", "var_2", "var_3", "var_4"];

const myVar = myVarsArray[1];

/* Acquire the second elemtn of the nested object objNames of the object myVarsObj and assign it to the variable with name myObjVar */
const myVarsObj = {
  objNames: ["name_1", "name_2", "name_3"],
};
  
const myObjVar = myVarsObj.objNames[1];