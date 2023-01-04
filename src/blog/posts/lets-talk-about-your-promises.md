---
title: Let's talk about your Promises 
author: Yuri
date: 2023-01-04
category: Development
image: ../images/v8-engine.jpg
credits: Photo by <a href="https://unsplash.com/@lee2d2?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">lee attwood</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a>
---
JavaScript is a programming language that allows developers to create websites, mobile apps, desktop applications, browser extensions, back-end applications, and much more. All of these are possible thanks to the V8 engine and APIs, such as Web API or libuv. If you want to know more about V8 and libuv, take a look at my post [Node.js under the hood](https://yuridelgado.dev/blog/nodejs-under-the-hood/)!

To manage asynchronous operations (one of the most used features in the language), JavaScript has the `Promise` class.

## How it was before Promises
Asynchronous programming in JavaScript isn’t new, unlike promises, which were introduced in ES6. Before that, the async operations had to be handled by callbacks.
Callbacks are functions that aren’t executed immediately, but only when something happened before. It can take a while, and we don’t know exactly how long it’ll take, but we know we want to execute some code with the incoming result.
For example, if you had to call an asynchronous method and then execute something with the response of it, you’d have something like:

<code-highlight language="javascript">
SomeObject.asyncMethod(function(err) {
  if (err)  {
    // Do some error handling
    return;
  }
  console.log('Success!');
});
</code-highlight>

Now imagine you want to read from a folder, iterate over each found image file, get its dimensions, resize it, and save it in a folder:

<code-highlight language="javascript">
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
  
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
</code-highlight>

I picked this example from [callbackhell.com](http://callbackhell.com/) and changed some parts of it. As the name suggests, this way of coding is called “callback hell”. There are a few problems with this approach:

1. Error handling is more error-prone once you can forget to look for errors.
2. There are no returned values, you only pass the data to the next callback until the end.
3. It’s harder to test, debug, and read.

## The Promise object

A common use case is a `fetch` request. Let’s see how this `Promise` looks like:

<code-highlight language="javascript">
const res = fetch('https://jsonplaceholder.typicode.com/todos/')
console.log(res)
</code-highlight>

The output:
<code-highlight>
Promise {&lt;pending&gt;}
[[Prototype]]: Promise
  catch: ƒ catch()
  constructor: ƒ Promise()
  finally: ƒ finally()
  then: ƒ then()
  Symbol(Symbol.toStringTag): "Promise"
[[Prototype]]: Object
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: Response
  body: (...)
  bodyUsed: false
  headers: Headers {}
  ok: true
  redirected: false
  status: 200
  statusText: ""
  type: "cors"
  url: "https://jsonplaceholder.typicode.com/todos/"
  [[Prototype]]: Response
</code-highlight>

A `Promise` is an object with one of these states:

1. Pending: when the promise is still working to get a value.
2. Rejected: something went wrong with your call. In the case of an HTTP request, for example, it could be an error 400 or 500.
3. Fulfilled: everything went well and you can continue with the value you wanted (or with no errors at all).

> You can play around with your network throttling in dev tools to see different states of the `fetch` example.
<br>

The `Promise.prototype` has the following methods:

1. catch: when the `Promise` is rejected, you can get the error state by using this method. 
2. finally: similarly to the `try/catch`'s `finally` block, this method is executed when the `Promise` has a state different than “pending”.
3. then: when the `Promise` is fulfilled, you can get the received data by using this method.

In the previous example, we are not getting the value, nor handling possible errors. A real-world implementation could be:

<code-highlight language="javascript">
fetch('https://jsonplaceholder.typicode.com/todos/')
  .then((response) => response.json())
  .then(console.log)
</code-highlight>

Here we fetch, convert the response to JSON (also using a Promise), and print the received data.

ES7 brought a syntax sugar to make things even easier:

<code-highlight language="javascript">
(async () => { 
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
  const data = await res.json()
  console.log(data)
})()
</code-highlight>

> I’m using an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) because it’s not possible to use async functions directly in the “root level” of your JavaScript file.

`async/await` allows us to store the values in variables and use them later.

`fetch` doesn’t throw exceptions in case of errors, so using `catch` is not so useful in this case. With `axios`, for example, we’d have something like:

<code-highlight language="javascript">
axios.get('https://jsonplaceholder.typicode.com/unknown-resource/')
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Something went wrong', error))
</code-highlight>

Using `async/await` syntax:

<code-highlight language="javascript">
(async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/unknown-resource/"
    );
    console.log(data);
  } catch (error) {
    console.error("Something went wrong", error);
  }
})();
</code-highlight>

## Concurrency methods
The `Promise` class implements some concurrency methods. Let’s take a look at them.

### Promise.all()
Receives an array of promises and returns a single promise which is fulfilled when all input promises are fulfilled, and rejects if any of the input promises is rejected.

<code-highlight language="javascript">
const getPromise = axios.get("https://jsonplaceholder.typicode.com/todos/");
const resolvedPromise = Promise.resolve(1);
const timeoutPromise = new Promise((res, rej) =>
  setTimeout(res, 1000, "Some value")
);
 
Promise.all([getPromise, resolvedPromise, timeoutPromise])
  .then(console.log)
  .catch(console.error);
</code-highlight>

It has the following output:

<code-highlight>
(3) [Object, 1, "Some value"]
</code-highlight>

If any of them rejects, we fall into the `catch` callback.

### Promise.allSettled()

Similarly to `Promise.all()` , it also returns a single promise for an array of promises. The difference is that `Promise.allSettled()` will return an object for each input `Promise`, with the status, the value, and a reason in case of the promise was rejected.

<code-highlight language="javascript">
const getPromise = axios.get("https://jsonplaceholder.typicode.com/todos/");
const resolvedPromise = Promise.resolve(1);
const timeoutPromise = new Promise((res, rej) =>
  setTimeout(res, 1000, "Some value")
);
Promise.allSettled([getPromise, resolvedPromise, timeoutPromise])
  .then(console.log)
</code-highlight>

The output:
<code-highlight>
(3) [Object, Object, Object]
  0: Object
    status: "fulfilled"
    value: Object
  1: Object
    status: "fulfilled"
    value: 1
  2: Object
    status: "fulfilled"
    value: "Some value"
</code-highlight>

Forcing a rejection in the first promise, we have:
<code-highlight>
(3) [Object, Object, Object]
	0: Object
		status: "rejected"
		reason: AxiosError: Request failed with status code 404
	1: Object
		status: "fulfilled"
		value: 1
	2: Object
		status: "fulfilled"
		value: "Some value"
</code-highlight>

### Promise.any()

It receives an input with an array of promises and return a `Promise` that will be fulfilled as soon as the first input `Promise` is fulfilled:

<code-highlight language="javascript">
const getPromise = axios.get("https://jsonplaceholder.typicode.com/sdsds/");
const resolvedPromise = Promise.resolve(1);
const timeoutPromise = new Promise((res, rej) =>
  setTimeout(res, 1000, "Some value")
);
 
Promise.any([getPromise, resolvedPromise, timeoutPromise])
  .then(console.log)
</code-highlight>

Output: `1`

The second promise will always be fulfilled first. So let’s remove it from the input and play around a little bit with the other two:

<code-highlight language="javascript">
const getPromise = axios.get("https://jsonplaceholder.typicode.com/todos/");
const timeoutPromise = new Promise((res, rej) =>
  setTimeout(res, 0, "Some value")
);
Promise.any([getPromise, timeoutPromise])
  .then(console.log)
</code-highlight>

Output: `Some value`

Now, increasing the timeout to 1000ms, the first promise will fulfill first, and the output will be:
 
<code-highlight language="javascript">
{data: Array(200), status: 200, statusText: "", headers: AxiosHeaders, config: Object…}
</code-highlight>

The return `Promise` only rejects if all of the input promises reject.

### Promise.race()

Given an array of promises, it returns a `Promise` that is either fulfilled or reject with the first settle.

<code-highlight language="javascript">
const getPromise = axios.get("https://jsonplaceholder.typicode.com/sdsds/");
const resolvedPromise = Promise.resolve(1);
const timeoutPromise = new Promise((res, rej) =>
  setTimeout(res, 1000, "Some value")
);
Promise.race([getPromise, resolvedPromise, timeoutPromise])
  .then(console.log)
  .catch(console.error)
</code-highlight>

Output: `1`

Rejecting the second promise by doing `Promise.reject(2)` we get:
Output: `2` (as a `console.error`)

### Some notes

All my examples used an array of promises, and I said that the input should be an array. Actually, the input of the concurrency methods can be any [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), for example, an Array or Map. In most cases, we’ll use simple arrays.

Promises are the common use case for `.then()` calls. However, concurrency methods can receive any [thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables) input, not only a `Promise` object. A thenable object in simple words is an object that implements the Thenable interface, with the `.then()` having two callbacks, one for the fulfillment, and the other for rejection.

Hope you enjoyed this post, and see you next time!