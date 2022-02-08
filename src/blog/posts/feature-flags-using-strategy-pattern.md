---
title: Feature flags using Strategy pattern
author: Yuri
date: 2022-02-07
category: Development
image: ../images/feature-flags-using-strategy-pattern.jpg
credits: Photo by <a href="https://unsplash.com/@yogesh_7?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener">Yogesh Pedamkar</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a>
---

One of the most important things I learned working in startups, especially when they are in the very beginning, is that we don’t know everything about the product or the customers. I mean, we think we know. Business plan, market research, brainstorms, ideation, prototyping, all of these are important, but they don’t consider the practical aspect. The customer in front of the computer, or grabbing your product, or using your product somehow is a unique experience. Sometimes a theoretical pain can be solved in a thousand different ways, from the simplest to the most laborious way. Overengineering and premature optimization are the keywords here, but it can be a topic for another post.

When it comes to testing the simplest version of a product in a team that continuously delivers software, the feature flagging (or feature toggling) will really come in handy.

## What is feature flagging

Feature flagging is the capability of turning on and off a certain feature according to your needs.
Agile teams should deliver constantly, even when features are not finished yet. It’s a bad idea to work on a branch for too long and make it far behind your main branch. Turn off your feature flag and the new feature is not going to impact your production version.

Let’s say you’re creating a group of beta testers (or running an A/B test) to a new feature that your team has developed. It can be risky to release it to your whole user base. Then you decide to do the following:

<code-highlight language="javascript">
const main = () => {
  const showNewFeature = false
  if (showNewFeature) {
    // new code
  } else {
    // old code
  }  
}
</code-highlight>

It works. Perhaps it's not the most elegant solution, but it works. If you have a limited number of flags and they’re temporary, I think it’s good enough. However, imagine your team is growing and many developers are working on new stuff. It’ll become harder and harder to manage these flags, to test, and the code can become really messy.

Another way to implement it is making use of the [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection#:~:text=In%20software%20engineering%2C%20dependency%20injection,object%20is%20called%20a%20service.) concept, it’ll allow you to test your code flow:

<code-highlight language="javascript">
const main = (config) => {
  if (config['showNewFeature']){
    // new code
  } else {
    // old code
  }
}
  
const config = { 'showNewFeature': true }
</code-highlight>

Slightly better, but we still have some coupling concerns. Your feature code has to be aware of a new dependency, the config dependency. What if we could do the opposite, instead of the new feature being aware of the feature flag config, your application would have control of it in a more transparent way?

## The Strategy pattern

[Strategy](https://en.wikipedia.org/wiki/Strategy_pattern) is a behavioral design pattern, i.e., it defines behaviors at run time with no need to define in the target function all possible behaviors.

Consider you have to render a navigation menu. The list of links in the menu will change accordingly to the logged user (it can be through A/B testing for example). Group A will see a list called “general”, and group B another one called “special” which is the “general” list appended with some items. According to the last example, we’d have something like this:

<code-highlight language="javascript">
const main = (config) => {
  if (config['useSpecialMenu']){
    return specialMenu
  } else {
    return generalMenu
  }
}
</code-highlight>

The `config` object would be injected similarly as we did before.

As I mentioned, although it’s a testable function, the downside of this approach is that your code depends on the feature flag definition and it’s polluted by if/else statements.

Applying the Strategy pattern, we could pass the responsibility of the decision to the caller, and the function itself would be agnostic about what to do with the “general” list. We’ll still use the dependency injection concept, but the body of the function won’t need to verify anything, because the caller will make any change for us.

<code-highlight language="javascript">
// menu.js
const generateMenu = (addBehavior) => {
  const generalMenu = ['Main', 'Customers', 'Orders']
  return addBehavior(generalMenu)
}
</code-highlight>

The function above receives a behavior function via parameter and returns the behavior function receiving the default list. It’s possible to change the general menu as you wish when calling the `generateMenu` function. We can add, remove, or keep the original list as it is.

<code-highlight language="javascript">
// featuresFactory.js
const createFeaturesBasedOnFlags = (config) => {
  function createMenu() {
    if (config['useSpecialMenu']) {
      const createSpecialMenu = (menu) => [...menu, 'Manage Users']
      return generateMenu(createSpecialMenu)
    } else {
      return generateMenu(x => x)
    }
  }
  // other features
  
  return { createMenu }
}
</code-highlight>

Now, we added another layer of abstraction. Remember I said that if/else statements can make the code messy and coupled? Indeed we are still using the conditionals, but with one difference: this layer is responsible for abstracting all the feature flags, whereas the previous menu function has no idea about them. The original function that returns the “general” list is still there, and the factory is ready to inject a new behavior to the “general” menu, adding one more item to it. The `else` statement will pass an [identity function](https://en.wikipedia.org/wiki/Identity_function) to `createMenu`, which means that nothing will happen to the original menu.

## Usage

<code-highlight language="javascript">
const factory = createFeaturesBasedOnFlags({'useSpecialMenu': true})
const newMenu = factory.createMenu()
console.log(newMenu) // ["Main", "Customers", "Orders", "Manage Users"]
</code-highlight>

If you define `useSpecialMenu` to `false`, "Manage Users" won't be displayed anymore.

## Feature conditions definition

It’d be also interesting to create a layer to define the features flags and their conditions. In all examples we used a simple JavaScript object with booleans, but in the real world it can be something more complex, like a database query, a list of items, or any other thing based on an internal or external definition. Firstly, we can create a “flag state manager”:

<code-highlight language="javascript">
// featureSetting.js
const feature = (config) => {
  function setFeature(name, isEnabled){
    config[name] = isEnabled;
  }
  
  function isEnabled(name){
    return config[name];
  }
  
  return { setFeature, isEnabled }
}
</code-highlight>

`setFeature` will set a feature to either true or false, and `isEnable` gets the boolean associated with that key.
Now, let’s say we’ll only allow users with more than 10 clients to see the special menu. The condition that have to be met in order to create a special menu is:

<code-highlight language="javascript">
// featureConditions.js
const featureConditions = () => {
  const config = {}
  const myFeatures = feature(config)
  
  function useSpecialMenu() {
    if (logedUser.clients.length > 10) {
      myFeatures.setFeature('useSpecialMenu', true)
    } else {
      myFeatures.setFeature('useSpecialMenu', false)
    }
    return myFeatures.isEnabled('useSpecialMenu')
  }
  
  return { useSpecialMenu }
}
</code-highlight>

Note: it’s called `useSpecialMenu` but it’s not a React hook!

In this closure we can set the flag to either `true` or `false` and return the enabled status.

Cool, now it’s time to use the new structure in the factory:

<code-highlight language="javascript">
// featuresFactory.js
const createFeaturesBasedOnFlags = (featureConditions) => {
  const conditions = featureConditions()
  
  function createMenu() {
    if (conditions.useSpecialMenu()) {
      const createSpecialMenu = (menu) => [...menu, 'Manage Users']
      return generateMenu(createSpecialMenu)
    } else {
      return generateMenu(x => x)
    }
  }
  // other features
  
  return { createMenu }
}

</code-highlight>

Instead of calling directly the `config` object like before, we call the method responsible for telling us if the user is able to see the special menu.

If the 10 clients rule changes, we just have to update the `useSpecialMenu()` and the rest of the software will keep working normally, decoupled and even ready to receive other flags definitions.

## Final words

Feature flags are very useful and there’re plenty of services that provide solutions to rollout, test, and create reports about the features. However, not always we want to integrate with a third-party service, pay, and create an external dependency to solve a simple problem. In those cases, creating your own feature flag system might be good enough.

I recommend you to read [Feature Toggles (aka Feature Flags)](https://martinfowler.com/articles/feature-toggles.html) by Martin Fowler to know more about dynamic and static flag configuration, types of toggles, another example using Strategy pattern, and much more. His article was my inspiration to write this one. And if you don’t know him, I strongly recommend you to read his [articles](https://martinfowler.com/).

Hope you have enjoyed today’s post!
