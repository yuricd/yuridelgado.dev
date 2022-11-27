---
title: Functional programming in JavaScript
author: Yuri
date: 2022-11-27
category: Development
image: ../images/functional-programming.jpg
credits: Photo by <a href="https://unsplash.com/@yellowteapot?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener">Meghan Holmes</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a>
---
  

When we start programming, it’s usual to start by learning imperative programming, which is a paradigm that describes how your software must behave. Probably you also learned OOP (object-oriented programming), which defines your software in terms of objects and data, and organizes your code with classes and methods.

However there are other paradigms and styles you can follow in order to take leverage of some great benefits. Besides imperative programming and OOP, there’re declarative programming, FP (functional programming), and many more.

## What is FP

Like OOP, FP is also a programming paradigm. As the name suggests, it focuses on defining your software around functions. In OOP we use functions inside object definitions, these type of functions we call “methods”. If we can use functions in both, why does FP take “functional” in its name?

The biggest difference is that FP has a restricted set of rules you need to follow to make it purely functional. Some of them are: the use of pure functions, immutability, first-class and higher-order functions, and recursions to name a few.

Among the most known functional languages we have Haskell, Elixir, Lisp, Clojure, and Erlang. I’ll explain some FP principles, but it’s worth noting that many of those languages are not 100% functional. Sticking to the constraints I mentioned before can make the developer’s life simpler, but also harder, decreasing their productivity. Then, some languages started absorbing some imperative/OOP features to be a little more flexible, without giving up their main concepts. Also, I’d say it’s almost impossible to be 100% pure functional because eventually you’ll have to perform some interface with impure languages like C or C++. 

In this post I’ll not cover how to write functional code in other languages than JavaScript, mainly because I don’t have enough experience with many of them. But here it’s a naive implementation of the Fibonacci sequence in a few of them.


Haskell:
<code-highlight language="haskell">
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)
fibList n = map fib [1..n]
</code-highlight>


Lisp:
<code-highlight language="javascript">
(defun fibonacci(n)
  (cond
    ((eq n 1) 0)
    ((eq n 2) 1)
    ((+ (fibonacci (- n 1)) (fibonacci (- n 2))))))))
</code-highlight>

Clojure:
<code-highlight language="clojure">
(defn fib [n]
 (case n
   0 0
   1 1
   (+ (fib (- n 1)) (fib (- n 2)))
 )
)
</code-highlight>


They look a bit different from the good old imperative and OOP, don’t they?

It might be weird at first look, and probably at second and third look too, but after dozens (or checking their docs), it starts making more sense.

It looks so different because we are not used to thinking in the same way when we are coding. Probably you don’t firstly think of recursions instead of iterative loops, or consider using prefix  instead of infix notation (`+ a b` instead of `a + b`).

As a first step, let’s see how we can code following some FP principles in JavaScript.


## Is JavaScript functional?

JavaScript is not a pure functional language. Nevertheless, JavaScript has an important feature that allows us to follow a FP paradigm. JavaScript has first-class functions, i.e. functions are treated like any other variable.

Assigning a function to a variable:

<code-highlight language="javascript">
const foo = function(bar) {
  console.log(bar)
}
</code-highlight>

Returning a function:

<code-highlight language="javascript">
const foo = function(bar) {
  return () => console.log(bar)
}
</code-highlight>

Passing a function as an argument:

<code-highlight language="javascript">
const foo = function(callback, ...args) {
  callback(...args)
}
</code-highlight>

## Concepts

### Pure functions
Pure functions return always the same output from the given input. It means that they are deterministic. You won’t have surprises when running a pure function over and over again. It might sound obvious, but a classic example of a non-pure function is a function that returns the current date.

<code-highlight language="javascript">
const getCurrentDate = () => new Date()
</code-highlight>

Each time you call this function it’ll return a different value. And so what? 

The problem is that you can’t easily test it. Once the return is not deterministic, we can’t tell what to expect in an automated test. By definition, a pure function must be isolated from the rest of the world.

The nature of what we want is not deterministic because it interfaces with something impure (the current date from your browser). One approach, and more difficult, to test that impure function is mocking the environment where it’s called, i.e. the browser instance. A second approach, and more functional, would be mocking the `new Date()` constructor.

FP relies on pure functions because they are deterministic and don’t change values by reference. It creates a more safe environment for development, avoiding side-effects.







### Immutability
Since ES6 (2015) there’re three options to declaring variables in JavaScript: `var`, `let`, and `const`.

It’s very common to see `var` in old JavaScript codes. The advent of `let` and `const` allowed us to handle scopes in a safer way.

Back to ES5, we could reassign a variable without even noticing it:

<code-highlight language="javascript">
var foo = 'Hi there'
// a lot of code here
 
if (true) {
  var foo = 'Bye bye'
}
</code-highlight>

Furthermore, we could access `foo`'s value out of the block's scope in which it was declared:

<code-highlight language="javascript">
if (true) {
  var foo = 'Bye bye'
}
 
console.log(foo) // Bye bye
</code-highlight>

The introduction of `let` made our implementation safer in terms of side-effects:

<code-highlight language="javascript">
let foo = 'Hi there'
 
if (true) {
  let foo = 'Bye bye'
}
 
console.log(foo) // Hi there
</code-highlight>

And:

<code-highlight language="javascript">
if (true) {
  let foo = 'Bye bye'
}
 
console.log(foo) // ReferenceError: foo is not defined
</code-highlight>


`let` is block scoped, i.e. it can't be used out of the block in which it was declared. `let` throws a syntax error when trying to re-declare it. 

But it’s possible to reassign values to variables declared with `let`. That's when `const` comes to play.

`const` is also block scoped and can't be re-declared, but unlike `let`, variables declared with `const` can't be reassigned.

<code-highlight language="javascript">
const foo = 'Hi there'
foo = 'Bye bye'
// TypeError: "foo" is read-only
</code-highlight>


There’s a difference when it comes to objects. The following code throws an exception as we expect:


<code-highlight language="javascript">
const foo = {
  bar: '1'
}
 
foo = {}
// TypeError: "foo" is read-only
</code-highlight>

However, the following code doesn’t:

<code-highlight language="javascript">
const foo = {
  bar: '1'
}
foo.bar = '2'
foo['newkey'] = '3'
 
console.log(foo) // {bar: "2", newkey: "3"}
</code-highlight>

This happens because reassigning a value changes the object’s reference to a new one, which is not allowed in `const` declaration, but an update doesn't. 

So `const` is the safest way to avoid side-effects when you don't want to reassign values or when you're trying to follow FP principles, but we still have to be aware of some mutations that can mutate objects by reference, it can be by updating a key's value, adding a key, appending an item to an array, etc.

### Map, filter, reduce

`for` and `while` are popular ways to iterate over arrays in JavaScript. 

Say you want to append only even numbers to an array:


<code-highlight language="javascript">
const arr = [1,2,3,4,5,6]
 
const evenNums = []
for (let i=0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) evenNums.push(arr[i])
}
 
console.log(evenNums) // [2, 4, 6]
</code-highlight>

This code works and there’s nothing wrong with it. But if we want to follow FP principles, we should note that we are pushing to an array declared out of the block that the push occurs.

A good way to handle arrays in JavaScript is by using map, filter and reduce, which are methods from `Array.prototype`.

**map:** applies a function on which element of the array and return a new array with the results. The output array has exactly the same length as the input. 

**filter:** applies a function on which element of the array and returns a new array only with the elements that returned truthy to the function application. The output has a length less or equal than the input’s length.

**reduce:** applies a reducer function in which element of the array and uses an accumulator that is returned on each call of the reducer. This one is slightly more confusing, so let’s see an example and some comparisons.

Say we want to double each element of an array:

<code-highlight language="javascript">
const arr = [1,2,3,4,5,6]
 
const doubled = arr.map(num => num * 2)
 
console.log(doubled) // [2, 4, 6, 8, 10, 12]
console.log(arr) // [1, 2, 3, 4, 5, 6] 
</code-highlight>

Notice that `arr` was not changed.

Back to the previous example, let’s get only the even numbers:

<code-highlight language="javascript">
const arr = [1,2,3,4,5,6]
 
const evenNums = arr.filter(num => num % 2 === 0)
 
console.log(evenNums) // [2, 4, 6]
console.log(arr) // [1, 2, 3, 4, 5, 6]
</code-highlight>

I consider this a clearer and more direct approach, don’t you?

Now, let’s sum all the numbers of the array:

<code-highlight language="javascript">
const arr = [1,2,3,4,5,6]
 
const sum = arr.reduce((acc, curr) => acc + curr, 0)
 
console.log(sum) // 21
console.log(arr) // [1, 2, 3, 4, 5, 6]
</code-highlight>

Every callback call must return the new accumulator state, in this case I called it `acc`. The last argument I provided is the initial value. Since we are summing numbers, it does make sense to start the sum at 0.

Let’s separate the even numbers into an array and the odds into another array. To do that, the initial value will be an array with two empty arrays and we’ll check: if the number is even, it goes to the first array, otherwise, it goes to the second. At the end, we expect to have an output like `[[2,4,6], [1,3,5]]`.

<code-highlight language="javascript">
const arr = [1,2,3,4,5,6]
 
const sum = arr.reduce(([even, odd], curr) => {
  if (curr % 2 === 0) {
    return [[...even, curr], odd]
  }
  return [even, [...odd, curr]]
}, [[], []])
 
console.log(sum) // [[2,4,6], [1,3,5]]
console.log(arr) // [1, 2, 3, 4, 5, 6]
</code-highlight>

Remember you always have to return something in your callback.

Reduce is very powerful and brings many possibilities because from an array you can return a number, string, list or any type you wish. 

Reduce is also the base of map and filter. Let’s quickly see how to implement a map and filter functions using reduce.


<code-highlight language="javascript">
const arr = [1,2,3,4,5,6]
 
const myMap = (arr, callback) => {
  return arr.reduce((agg, curr) => {
    return [...agg, callback(curr)]
  }, [])
}
 
const myFilter = (arr, callback) => {
  return arr.reduce((agg, curr) => {
    if (callback(curr)) {
      return [...agg, curr]
    }
    return agg
  }, [])
}
 
const mapped = myMap(arr, (n) => n * 2)
console.log(mapped) // [2, 4, 6, 8, 10, 12]
 
const filtered = myFilter(arr, (n) => n % 2 === 0)
console.log(filtered) // [2, 4, 6] 
</code-highlight>

Map, filter and reduce are very important to FP and they are mainly implemented using a technique called recursion.

### Recursion

In simple terms, a recursive function is a function that calls itself. 

Say we want to print all the numbers from a given number to zero. An iterative approach could be:


<code-highlight language="javascript">
function printUntil(num) {
  for (let i=num; i>=0; i--) {
    console.log(i)
  }
}
 
printUntil(10)
</code-highlight>

In this simple example we are applying the same function to all `i`s, i.e., to all numbers we are interested in.

The function (`console.log` in this case) that is being applied for `i` is the same for `i`-1 and so on and so forth.

A recursive approach could be:

<code-highlight language="javascript">
function rec(num) {
  console.log(num)
  return rec(num - 1)
}
 
rec(10)
</code-highlight>

We first print `10` and call the `rec` function for `9`, which will also be printed and will call `rec` for `8`. Cool, right?

There’s one problem with this recursive function. It doesn’t stop! It tends to negative infinity. So here it is a crucial concept for recursion: the base case.

The base case is the stop condition. It can be one or many, depending on your problem, but it has to exist, otherwise your recursion will run forever.

The fixed version of the previous code is:

<code-highlight language="javascript">
function rec(num) {
  if (num < 0) {
    return num
  }
  console.log(num)
  return rec(num - 1)
}
 
rec(11)
</code-highlight>

When `num` decrements to `0`, it'll stop the recursion.

For the sake of this post’s size I won’t detail why recursion works. A TL;DR could be: each call of your recursive function goes to a call stack and is popped when it returns. You can see a detailed explanation in this [freeCodeCamp article]([https://www.freecodecamp.org/news/how-recursion-works-explained-with-flowcharts-and-a-video-de61f40cb7f9/](https://www.freecodecamp.org/news/how-recursion-works-explained-with-flowcharts-and-a-video-de61f40cb7f9/)).

Recursions are useful because you don’t need to mutate data when using them. Your function becomes stateless and deterministic.  

It’s possible to code recursive functions as iterations, but the opposite is not always true.

### Closures
Closure is the capability of an inner function to remember the scope of its outer function even when it was already returned. Let’s see an example:

<code-highlight language="javascript">
const buildInvitation = (from, to) => {
  return `Dear ${to},\nThis is my wedding invitation.\n\n${from}`
}
 
const inv1 = buildInvitation('John and Jane Doe', 'Bob')
const inv2 = buildInvitation('John and Jane Doe', 'Chris')
 
// Dear Bob,
// This is my wedding invitation.
//
// John and Jane Doe
</code-highlight>

John and Jane Doe are inviting some friends and family to their wedding. John and Jane are the only senders of the message, i.e., `from` will be always the same.

One approach could be removing the param and adding their names directly in the string. But let’s say this is a generic function used in your wedding’s application that will serve thousands of couples.

Thus, to avoid repetition, let’s change to the following:

<code-highlight language="javascript">
const buildInvitation = (from) => 
  (to) => `Dear ${to},\nThis is my wedding invitation.\n\n${from}`
 
const janeJohnInv = buildInvitation('John and Jane Doe')
const inv1 = janeJohnInv('Bob')
const inv2 = janeJohnInv('Chris')
</code-highlight>

It gives us the exact same output, but our function `janeJohnInv` can remember the `from` argument. 

JavaScript lets us return functions, and due to its capability of “remembering” previously passed arguments, it can save some time and lines of code.

## Final words
Using FP can be a good way to prevent side-effects, keep your code more testable, easy to change and debug. There’s nothing wrong with other approaches and paradigms, each one has its pros and cons. It’s up to you to choose the best one according to your problem. 

That was a brief explanation of this topic, there are thousands of materials out there and many cool things to study. What about studying a functional language next?