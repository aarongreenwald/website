Using Reselect Selectors with Parameters
6/27/2018
redux reselect performance code 

_If you're here because you are using [redux](https://github.com/reduxjs/redux) with [reselect](https://github.com/reduxjs/reselect) and want to know how you can pass an argument to the `createSelector` function, you've come to the right place. If you're here for any other reason, you're trespassing. But come on in and have a listen, Internet stalkers don't have to pay extra._ 

Too lazy to read? The solution to your problem is [here](#solution).

-----------------


Let's say you're building an app call The Stuff App<sup>TM</sup>, which is an extremely popular mobile app poised to go viral any minute now. It allows users to view, manipulate, and share Stuff<sup>TM</sup> with their friends and followers in realtime. 

In your app, you have a [redux](https://github.com/reduxjs/redux) store, which is simply an object that has a bunch of stuff in it and promises that it will never mutate itself. (There's nothing really special about a redux store except that simple contract.) And let's assume that given this state, you can do some complicated calculations to return a list of Stuff<sup>TM</sup> to display to the user. So you do this: 

```js
const {createSelector} = require('reselect')

const someSelector = state => {
  //return some data from the state
}

const anotherSelector = state => {
  //return some more, different data from the state 
}

const ourExpensiveFunction = (someSelectorResult, anotherSelectorResult) => {
  //do expensive calculations with the two inputs
  //return processed data that represents the list of Stuff
}

export const getStuffList = createSelector(
  someSelector,
  anotherSelector,
  ourExpensiveFunction
)

```

And all is well.

Then your app _does_ go viral, and even though you have a questionably viable monetization plan, you receive a buyout offer from BigCo for $5 billion. You weigh your options, think long and hard about your vision for your app, and then you come to your senses. $5 billion is a lot of money. So you go to work for BigCo where you have a team of colleagues and you're all going to work to scale the app, build new functionality, and turn it into something more monetizable than just sharing Stuff with friends who are actually just bots purchased by "influencers".

Here's where things get complicated. It turns out that in order to address a broader audience, you need to be able to group Stuff into multiple categories and allow the user to switch between filters and see different lists depending on their needs/wants/whims. Categories are not mutually exclusive, so a single Stuff item can show up in multiple lists, and you expect users to frequently switch between the same five or six lists. 

No problem, you say. You'll just go to your `getStuffList` selector and add another parameter called `filters`. When you want to render a component with a specific filter, you'll [connect](https://github.com/reduxjs/react-redux/blob/v3.1.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) your store to the component and map the state to props like this:

```js
const filters = //some filters

function mapStateToProps(state) {
  return {
    stuff: getStuffList(state, filters)
  }
}

```

Except that doesn't work, because apparently reselect's `createSelector` function returns a function of `state` and doesn't accept arbitrary parameters. But you do a quick search on StackOverflow and find recommendations to put the user's selected filter in the state somewhere and pull them from there, which makes a lot of sense. Ok, so you figure your selectors will look like this:

```js
const someSelector = state => {
  //return some data from the state
}

const anotherSelector = state => {
  //return some more, different data from the state 
}

const filtersSelector = state => state.selectedFilters

const ourExpensiveFunction = (someSelectorResult, 
                              anotherSelectorResult, 
                              filtersSelectorResult) => {
  //do expensive calculations with the two inputs + the filters
  //return processed data that represents the FILTERED list of Stuff
}

export const getStuffList = createSelector(
  someSelector,
  anotherSelector,
  filtersSelector,
  ourExpensiveFunction
)

```
And everything works fine. The end. 

---------------

Actually, no, not the end. You should have slowed down a bit and talked with your product team about what exactly they meant when they talked about supporting filters. It turns out they want to be able to have multiple active filters _at the same time_. 

Why? Well...it's a mobile app, built in React Native using the fully native navigation provided by [React Native Navigation](https://github.com/wix/react-native-navigation). And the unfiltered list (ie all Stuff) will be shown at the root level of the navigation stack when the user opens the app. When the user taps on some button, another screen (Controller on ios, Activity on android) will be pushed _on top_ of the root screen, with the filtered list. If the user switches tabs, yet another filter might be shown. All of these filters are simultaneously active and rendered. They're simultaneously ready for responses to user input or changes in the state.  And having them flicker in and out when the user pops screens from the stack or switches tabs is an unacceptable UX compromise.

So now you have a problem. You can't simply store the selected filters in the state, because you have multiple selected filters and different callers of the same selector expect different results. You don't want to separate the data in your redux store, because there's overlap of data (many of the Stuff items appear in multiple filters) and it doesn't make sense to duplicate the data. This _seems_ like a classic use case for selectors, but you're hitting a wall, so you and your team search the web for how to pass a parameter to a reselect selector. It  seems like it shouldn't be too hard to just change the selector's api to something like `getStuffList(filters)`, where `filters` can be passed in when the selector is called. What you're trying to get at, ultimately, is a usage pattern that looks something like this: 

```js
const filters = //some filters
//
function mapStateToProps(state) {
  return {
    stuff: getStuffList(filters)(state)
  }
}
 
```

The wise sages of Internet give you the great idea to turn `getStuffList` into a factory function that returns a selector for the given filter, like this: 

```js
const someSelector = state => {
  //return some data from the state
}

const anotherSelector = state => {
  //return some more, different data from the state 
}

const ourExpensiveFunction = (someSelectorResult, 
                              anotherSelectorResult, 
                              filters) => {
  //do expensive calculations with the two inputs + the filters
  //return processed data that represents the FILTERED list of Stuff
}


export const getStuffList = filters => createSelector(
  someSelector,
  anotherSelector,
  filters,
  ourExpensiveFunction
)

```
 
That will work (in the sense that you'll get correct results), but it's not a good solution. The whole point of using reselect is for the performance benefits of memoization. You want to be sure that `ourExpensiveFunction` will not execute if the result of the previous selectors didn't change. And this solution throws away those memoization benefits, because every time `getStuffList` is called a new selector with no memoization history is created. So you never get a memoized result. And `getStuffList` is called every time the state changes! At this point you may as well just write a simple function that takes state + your argument and returns your view. At least then people will be able to read your code without being thoroughly confused at first (an unfortunate side-effect of using reselect is that most people who look at your code will say "wat"?). 

Of course, you aren't willing to get rid of the memoization because of the performance cost that would incur. It's critical for your use case that you don't run the selector function every time anything in the state changes, which can be all the time. You only want to run it when a _relevant_ part of the state changes, and even then, you _must_ return the same object (by reference) if the result will be the same anyway.

So you try to modify you solution like this: 

```js
const ourExpensiveFunction = (someSelectorResult, 
                              anotherSelectorResult) => {
  return filters => {
	  //do expensive calculations with the two inputs + the filters
	  //return processed data that represents the FILTERED list of Stuff
  }                             
}

export const getStuffList = createSelector(
  someSelector,
  anotherSelector,
  ourExpensiveFunction
)
```

Which you use like this:

```js
const filters = //some filters

function mapStateToProps(state) {
	return {
		stuff: getStuffList(state)(filters)
	}
}

```

This is better, because invoking `getStuffList` doesn't create a new selector, it _is_ the selector. Still, it's no good, because you don't get the memoization benefit of reselect where you really need it. What's happening here? The selector created by `createSelector` doesn't return the data you want (`stuffList`). Instead, it returns a function with the signature `filters => stuffList`, and the expensive calculations happen inside that function. So, the expensive function isn't part of the selector at all, which means that the only memoization you get happens inside `someSelector` and `anotherSelector`, not where the hard work is. And the memoization you get isn't per filter at all. So while this solution is an improvement over the previous one, you ultimately discard it as well.

<a name="solution"></a>The Solution
------------

Eventually you figure it out. You were on track earlier, trying to create a factory function. Your problem was that you invoked the factory function inside the `mapStateToProps`, which runs frequently. You need to execute the factory function _just once_ per filter, and use the result (the proper selector) in the `mapStateToProps`.

```js
export const createGetStuffList = filters => createSelector(
    someSelector,
    anotherSelector,
    filters,
    ourExpensiveFunction
)

```
And you use it like this: 

```js
const filters = //some filters
const getStuffList = createGetStuffList(filters)

function mapStateToProps(state) {
	return {
		stuff: getStuffList(state)
	}
}

```

The benefit of this is that the the selector factory is called just once per filter, not every time `mapStateToProps` is called. And each invocation of the factory creates a new selector, with its own memoization, so you end up with memoization per filter. Every time a given selector is called (ie for the same filtered component), it gets the memoized result for that particular filter. Each selector is independent and they do not conflict with one another or overwrite each other's memoization.

This is good as long as there's only one `mapStateToProps` per filter (ie you have a single connected component per filter). If you have multiple connected components per filter, you need to make sure that the factory function memoizes its results as well! Otherwise the multiple components rendering the same filter will not share memoization. Try something like this:

```js
const memoize = require('lru-memoize').default;
//set to the number of filters you want to concurrently support. 
//Be reasonable, this has a memory impact
const MAX_FILTERS_COUNT = 10 

const _createGetStuffList = filters => createSelector(
    someSelector,
    anotherSelector,
    filters,
    ourExpensiveFunction
)

export const createGetStuffList = memoize(MAX_FILTERS_COUNT)(_createGetStuffList)
```

Pretty cool, huh?

_Note: I prefer the following minor refactor, which I think is cleaner because the filters are not actually a selector. It has the same effect as the final solution, but is just a bit nicer in my opinion. I didn't include it in the recommended solution to maintain continuity between the various options, but our production code actually looks more like this:_ 


```js
const createGetStuffList = filters => createSelector(
    someSelector,
    anotherSelector,
    (someSelectorResult, anotherSelectorResult) => 
		ourExpensiveFunction(someSelectorResult, 
						     anotherSelectorResult, 
    						 filters)
)
```

Takeaways
------------

So what's the takeaway here? 

First of all, notice how similar the various solutions look. It's surprisingly easy to really mess up the performance of your app if you don't keep out an eagle-eye for changes to your selectors over time. Even if you write lots of unit tests, unless you explicitly test for performance, it's easy for nasty bugs to creep in without anyone noticing. Someone writes a selector, requirements change, someone else changes just one line somewhere to meet the new requirements. All the existing tests are passing, so everything looks good. So they push...and a few weeks later you're scratching your head trying to figure out why things are so slow. 

And yes, the performance impact of these kinds of things can be huge. One of the most surprising things to me when trying to figure out why our React Native app was slow was the discovery that a huge part of our bottleneck could be removed by simply not creating new objects in render functions (when those objects will be passed as props to child components). Things like not properly memoizing selectors, or other sins like arrow functions in props or inline style objects make a huge difference in the app's performance<sup><a href="#1_dest" name="1_source">1</a></sup>.

Another possible takeaway here is that we shouldn't be using redux + reselect. I don't really want to get embroiled in the **Great War of JS State Management Libraries**, but I'll say this: if someone wants to argue that redux + reselect hands you lots rope to hang yourself with, I don't have a counterargument. Despite the fact that I generally like these libraries, I have to admit that the patterns are dangerous. That's not to say that there aren't pitfalls in other competing solutions, though, so you need to evaluate these things for yourself holistically.

Finally, I challenge you to honestly call the code here "straightforward". This code is confusing and hard to read, not simple to reason about, and requires developers to think. Which is cool and all, because thinking is kind of our job. But still, we needn't always write the cleverest code just to prove to ourselves that we _get_ functional programming. One of the wisest pieces of advice I got starting out my career as a developer was to "never code at 100% of [my] mental capacity". Why? Because when things go wrong - and they will - you need to be able to debug and fix your code at 2am after a few drinks, in your pajamas, with your boss nagging you every five minutes on slack. If you had to stretch your brain to understand the code when you wrote it under better conditions, well...you're up the creek. So do yourself a favor and write simple code.

All that said, if you're like me, you find yourself working in projects that have a mix of state management solutions, including redux. And you care about performance. And because you write React Native, you know that you walk a tightrope. Just one mistake and a screen's loading time can go from 300ms to 3 seconds. You've been there, you have the scars, and you make sure to memoize. 

So stay sharp, my friends. Don't let that memoization-breaking PR sneak past you. Your users are counting on you.

_Credits: [Dror Biran](https://medium.com/@drorbiran) paired with me and came up with a good chunk of this solution as well
as the content for this blog post. You can follow his [blog](https://medium.com/@drorbiran) here._

_Warning: This post was originally drafted on June 27 2018, and reflects the state of redux + reselect that I found at that time. By June 30, I had forgotten about it and never published it. Until six months later, when I remembered about it and figured it might do someone some good. So I dusted it off, edited it for clarity and added some points and published it. But do take everything with a grain of salt - it's possible that the libraries have progressed since then and there's a better solution to all this._

<small><a href="#1_source" name="1_dest"><sup>1</sup></a> This is a topic for another blogpost, but in the meantime I highly recommend [Ofir Dagan](https://twitter.com/ofirdagan2/)'s [writeup](https://hackernoon.com/dont-blame-it-on-react-native-2eb0be3000b6) on performance in React Native as well as his [talk](https://www.youtube.com/watch?v=U3uI7jHV458) on the same topic.)</small>

<style>
	small {
	    line-height: 1.6em;
	    font-size: 0.7em;	
	    display: block;
	}
</style>
