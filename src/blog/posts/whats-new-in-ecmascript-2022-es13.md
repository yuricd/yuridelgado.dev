---
title: What's new in ECMAScript 2022 (ES13)
author: Yuri
date: 2023-01-24
category: Development
image: ../images/whats-new-in-ecmascript-2022-es13.jpg
credits: Photo by <a href="https://unsplash.com/@flowforfrank?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Ferenc Almasi</a> on <a href="https://unsplash.com/photos/VPmMy8YA_cU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>
  
---
In this post, I’ll talk about the new standards that ES13 (2022) brought.
First of all, let’s understand what is Ecma and ECMAScript.

## What is ECMAScript

I’ve already mentioned in previous posts that back in the day JavaScript was a mess due to the lack of standards. Fortunately, [Ecma International](https://www.ecma-international.org/) brought some standards to JavaScript in 1997 with the name ECMAScript. It was a JavaScript developed by Netscape in 1996. However, from 1999 to 2009, no edition was published.

But in December 2009, some improvements came, such as the “strict mode”, and getters and setters. From 2015 on, every year Ecma released a new edition of ECMAScript under the names: ECMAScript 2015 (ES6), ECMAScript 2016 (ES7), ECMAScript 2017 (ES8), ECMAScript 2018 (ES9), ECMAScript 2019 (ES10), ECMAScript 2020 (ES11), ECMAScript 2021 (ES12), ECMAScript 2022 (ES13).

Besides JavaScript, Ecma also defines the standard in several other technologies, such as C#, Dart, communications, multimedia coding, acoustics, IoT, etc.

## What’s new in ES13

If you code in JavaScript for a while, for sure you have already heard about ES6 strict mode, class declarations, modules, arrow functions, and let and const keywords. Those are some of the standards that ES6 brought in 2015. It allows us to write simpler and better code.

In 2022, [ES13](https://262.ecma-international.org/13.0/) brought the following:

### [Top-level await](https://github.com/tc39/proposal-top-level-await)

Previously, await calls couldn't happen in the top-level of your file. If you had to call some async function, you had to use an IIFE by doing:

<code-highlight language="javascript">
(async () => {
  const data = await fetch(url);
})();
</code-highlight>

This feature allows us to `await` the async function at the top level.

### [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields)

**Field declarations**

It was not possible to define class fields (attributes) outside constructors. Example:

<code-highlight language="javascript">
class Counter extends HTMLElement {
  clicked() {
    this.x++;
    window.requestAnimationFrame(this.render.bind(this));
  }
 
  constructor() {
    super();
    this.onclick = this.clicked.bind(this);
    this.x = 0;
  }
 
  connectedCallback() { this.render(); }
 
  render() {
    this.textContent = this.x.toString();
  }
}
window.customElements.define('num-counter', Counter);
</code-highlight>

> Took from the [proposal](https://github.com/tc39/proposal-class-fields#a-guiding-example-custom-elements-with-classes).

Note that the attribute `x` had to be declared and initialized inside `constructor()`. Now, the following is possible:

<code-highlight language="javascript">
class Counter extends HTMLElement {
  x = 0;
 
  clicked() {
    this.x++;
    window.requestAnimationFrame(this.render.bind(this));
  }
 
  constructor() {
    super();
    this.onclick = this.clicked.bind(this);
  }
 
  connectedCallback() { this.render(); }
 
  render() {
    this.textContent = this.x.toString();
  }
}
window.customElements.define('num-counter', Counter);
</code-highlight>


**Private fields**

Access modifiers in JavaScript didn’t exist indeed. Now, this new feature allows the developers to expose or not some private fields and methods to the external world:

<code-highlight language="javascript">
class Counter extends HTMLElement {
  #x = 0;
 
  clicked() {
    this.#x++;
    window.requestAnimationFrame(this.render.bind(this));
  }
 
  constructor() {
    super();
    this.onclick = this.clicked.bind(this);
  }
 
  connectedCallback() { this.render(); }
 
  render() {
    this.textContent = this.#x.toString();
  }
}
window.customElements.define('num-counter', Counter);
</code-highlight>

> Took from the [proposal](https://github.com/tc39/proposal-class-fields#private-fields).

If you create an instance of `Counter` and try to access the value of `x`, you can't, because it's a private field. It prevents accidents by increasing encapsulation. 

### [ECMAScript class static initialization blocks](https://github.com/tc39/proposal-class-static-block)

Both static fields and blocks are executed in the class creation, i.e., they don’t require instantiation. Static blocks are executed in the order they were created:

<code-highlight language="javascript">
class Car {
  static tires = 4;
  static isEngineOn = false
 
  static {
   this.isEngineOn = true 
  }
}
 
console.log(Car.isEngineOn) // true
</code-highlight>


### [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in)

This feature allows us to check if there’s a private field in the class without throwing an exception. One way of handling this situation could be:

<code-highlight language="javascript">
class Car {
  #brand
 
  static isCar(obj) {
    try {
      obj.#brand
      return true
    } catch {
      return false
    }
  }
}
</code-highlight>

The new brand check allows us to check for the field by just using the `in` operator:

<code-highlight language="javascript">
class Car {
  #brand
 
  static isCar(obj) {
    try {
      obj.#brand
      return true
    } catch {
      return false
    }
  }
}
</code-highlight>

### [RegExp Match Indices for ECMAScript](https://github.com/tc39/proposal-regexp-match-indices)

The previous `exec()` method from `RegExp` provided some information about the match in a given string:

<code-highlight language="javascript">
const genres = ['heavy metal', 'death metal', 'nu metal']
const regex = /death/g
regex.exec(genres)
// [
//	"death",
//	groups: undefined,
//	index: 12,
//	input: "heavy metal,death metal,nu metal"
// ]
</code-highlight>

Now, with the new match indexes, we can pass `d` to the RegEx, and then we get the indices array:

<code-highlight language="javascript">
const genres = ['heavy metal', 'death metal', 'nu metal']
const regex = /death/dg
regex.exec(genres)
// [
//	"death",
//	groups: undefined,
//	index: 12,
//	indices: [12, 17],
//	input: "heavy metal,death metal,nu metal"
// ]
</code-highlight>

### [`.at()` method on all the built-in indexables](https://github.com/tc39/proposal-relative-indexing-method)

To get the last element of an array, you’d probably do the following:

<code-highlight language="javascript">
const arr = [1,2,3,4]
const last = arr[arr.length - 1] // 4
</code-highlight>

With ES13, you can use `at()` method to access "negative indexes":

<code-highlight language="javascript">
const arr = [1,2,3,4]
const last = arr.at(-1) // 4
</code-highlight>

### [Accessible `Object.prototype.hasOwnProperty()`](https://github.com/tc39/proposal-accessible-object-hasownproperty)

To check if the objects has a property, it’s common to do:

<code-highlight language="javascript">
let hasOwnProperty = Object.prototype.hasOwnProperty
  
if (hasOwnProperty.call(object, "foo")) {
  console.log("has property foo")
}
</code-highlight>

> Took from the [proposal](https://github.com/tc39/proposal-accessible-object-hasownproperty#motivation)

To make code more readable and clean, many developers save the method’s reference to a new variable and use it whenever they want.
Since it’s not recommended to call `Object.hasOwnProperty` directly (because the object can implement this method), the use of the prototype is almost ways a better choice.
With ES13, it’s possible to call `hasOwn()` method directly from `Object`:

<code-highlight language="javascript">
if (Object.hasOwn(object, "foo")) {
  console.log("has property foo")
}
</code-highlight>

> Took from the [proposal](https://github.com/tc39/proposal-accessible-object-hasownproperty#motivation)


### [Error Cause](https://github.com/tc39/proposal-error-cause)

Error stack traces sometimes are difficult to figure out the cause of the error.

ECMAScript 2022 introduces the `cause` property that specifies which error caused the other error.

<code-highlight language="javascript">
async function doJob() {
  const rawResource = await fetch('//domain/resource-a')
    .catch(err => {
      throw new Error('Download raw resource failed', { cause: err });
    });
  const jobResult = doComputationalHeavyJob(rawResource);
  await fetch('//domain/upload', { method: 'POST', body: jobResult })
    .catch(err => {
      throw new Error('Upload job result failed', { cause: err });
    });
}
  
try {
  await doJob();
} catch (e) {
  console.log(e);
  console.log('Caused by', e.cause);
}
// Error: Upload job result failed
// Caused by TypeError: Failed to fetch 
</code-highlight>

> Took from the [proposal](https://github.com/tc39/proposal-error-cause#chaining-errors)

### [Proposal-array-find-from-last](https://github.com/tc39/proposal-array-find-from-last)

Let’s say your application is adding elements to a base array and you want to manipulate that array. This case is a typical React scenario where you have to manipulate the DOM by checking if elements in an array are there. Probably we can ensure that the element you’re looking for is in the second half of the array. In this case, using the traditional `.find()`  method could result in an unnecessary check in the first half of the array. Another option would be reversing the array and then applying the same method. Not a very good solution as well, bad performance, and bad readability.
ES13 introduced `Array.prototype.findLast()` and `Array.prototype.findLastIndex(()` methods, which help developers in those scenarios. Besides having better performance, it also helps with readability because it describes better what the developer is doing.

<code-highlight language="javascript">
const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
  
// ======== Before the proposal ===========
[...array].reverse().find(n => n.value % 2 === 1); // { value: 3 }
  
// ======== In the proposal =========== 
// find
array.findLast(n => n.value % 2 === 1); // { value: 3 }
</code-highlight>

> Took from the [proposal](https://github.com/tc39/proposal-array-find-from-last#core-features)

---

Good stuff, isn’t it? Thank you for reading this post, and I hope you could learn something new. 🙂

See ya!