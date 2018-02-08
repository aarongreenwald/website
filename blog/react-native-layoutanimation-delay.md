(React Native) LayoutAnimation Delay
2/8/2018
reactnative animations

You know why I like React Native? Because the documentation is incomplete. This gives me an excuse to dig in to the React Native codebase and honestly tell my boss that I'm working, not just entertaining myself.<sup>1</sup>

Just the other day I discovered that the `LayoutAnimation` API (partially documented [here](https://facebook.github.io/react-native/docs/layoutanimation.html) and [here](https://facebook.github.io/react-native/docs/animations.html#layoutanimation-api)) allows you to set a `delay` on the animation. Here's an example of how:

```javascript
    //all duration/delay values are in ms
    const myCustomAnimationConfig = {
        duration: 300,
        update: {
            delay: 500,
            type: LayoutAnimation.Types.easeInEaseOut
        },
        create: {
            delay: 300,
            type: LayoutAnimation.Types.easeInEaseOut
        },
        delete: {
            delay: 100,
            type: LayoutAnimation.Types.easeInEaseOut
        }
    };
    LayoutAnimation.configureNext(myCustomAnimationConfig);
```

Pretty cool, right? 

<small>
_Credit to [Justin Poliachik](https://medium.com/@Jpoliachik) for this [blog post](https://medium.com/@Jpoliachik/react-native-s-layoutanimation-is-awesome-4a4d317afd3e), which helped me work out how this works._
</small>


--------------------
<div style="font-size:small">

<sup>1</sup>It's also an opportunity for people like yourself to help out by submitting a PR. Yes, you. So don't just sit there reading this, go do it!
</div>

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/zenburn.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
<style>
    pre {
        overflow-x: scroll;
        max-width: 97vw;
    }

    code {
        background-color: rgba(100, 100, 100, 0.25);
        border-radius: 4px;
        padding: 2px 5px;
    }
</style>