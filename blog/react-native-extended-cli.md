React Native Extended CLI
12/4/2016
react reactnative tools

### tldr;

`rnx` (short for React Native Extended CLI) is a tool you can install via npm and use as a CLI instead of using the react-native CLI. It supports everything the built-in CLI supports plus a bunch of handy tools that will save you time and stress. View the code on [github](https://github.com/wix/react-native-extended-cli).

### Why rnx?

To understand why we built rnx, you need to understand a bit about how our mobile development is done. At Wix, we are building a single mobile app that aims to (eventually) incorporate functionality and support for a very diverse set of users and needs. Our company structure (read more [here](http://www.aviransplace.com/2015/08/10/building-a-guild/)) is organized by business function, and we want self-contained teams developing components of the application separately.

What does this all mean? That we spin up modules fairly frequently. That means lots of demo apps, lots of repos, and lots of opportunity for code reuse. rnx tries to alleviate some of the code duplication, particularly surrounding utility scripts in addition to making module creation an almost painless process.

My small group of four developers currently maintains primary ownership for three modules, and contributes to others as needed. Before rnx, each module had its own style and npm commands. Now, I can move between multiple modules and projects and keep my workflow.

### How It Works

The idea is that you can install `react-native-extended-cli` as a global npm module and use the command `rnx` in any directory containing a React Native project. As its name implies, it’s intended as an extension/replacement of React Native’s shipped CLI, so any command that works with `react-native `should work with `rnx`.

It does this by first checking if the command you passed is something it recognizes, and falling back to `react-native` if it doesn’t.

The basic commands:

* `rnx init` — initialize a brand new module with an accompanying demo app, a whole bunch of boilerplate, etc. And specify which version of React Native you want to use, so you can be compatible with the hosting app.
* `rnx start` — this is just react-native start. It starts the packager, and you can’t work without it.
* `rnx app` — most of the time I want to start the iOS and android apps without waiting for a build because I don’t have changes to native code. This starts up the simulator/emulators and starts the apps. Optionally run just iOS or android.
* `rnx build` — builds the iOS and android projects. Optionally run just iOS or android.
* `rnx test` — runs unit tests and e2e tests for the project. Optionally run just iOS or android.
* `rnx xcode` — opens the ios project in xcode, for those miserable times when you have no choice
* `rnx lint` — lints the code…duh
* `rnx watch` — watches the `src` and `test` directories runs lint and unit tests on changes

### It Seems Opinionated

That’s because it is. Very much so. Here’s what it assumes/tells/expects you to do:

* Use Lint
* Write Unit Tests (Jasmine, Enzyme, Enzyme Drivers)
* Write E2E Tests ([Detox](https://github.com/wix/detox))
* Structure your code nicely
* Use [React Native Navigation](https://github.com/wix/react-native-navigation)
* and some more stuff I take for granted

You know what it allows you to do? Start a project for any version of React Native, even a version that isn’t the latest.

### What’s Next?

Rewrite as NodeJS scripts. Bash scripts are a pain to manage. Maybe that’s because as a millennial I never really got that good with Bash, or maybe because JavaScript really is just much better.

### Should You Use It?

How should I know? The answer, my friend, is not with me, but inside you. Search deep within and you will know. As a guide, though, you might want to ask yourself some of these questions:

* How do I feel about the naming/style conventions rnx enforces?
* Will I be starting many modules/apps?
* Am I lazy?

If you are lazy, will be starting many modules, and are willing to put up with the conventions it enforces, go right ahead. More likely, you’ll find you like some of it and dislike other parts. So use it as inspiration and create a knock-off.