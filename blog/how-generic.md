How Generic is Too Generic? A Suggestion
12/18/2018
architecture code 

Recently I've been giving a lot of thought to the issue of genericization (that _might_ be an actual word) in application infrastructure. We all know that the holy grail of software development is to not repeat yourself. And most would say that the principle applies not just inside an individual project, but inside an organization and the larger ecosystem as well. That's how we end up in this familiar scenario:

You work for a large company, and you notice that multiple teams in different parts of the company are building the same kind of functionality for different projects. But you're a good developer, and you pride yourself on how well you look out for the broader wellbeing of the projects you work on. You care about code reuse. You care about clean architecture. So you pitch the idea that maybe, just maybe, the two teams should combine efforts and save on redundant work. Why not build a shared service that will serve both teams? A microservice, you'll call it. (This scores you extra points in buzzword bingo.) This service won't be too specific to any of the individual use-cases, it'll be generic. This will make it more durable, because maybe in the future even more projects will use it. You're not just building products anymore, you're building _infrastructure_.

_Awesome._

So a new team is formed, possibly with some members of the teams that need the new service, perhaps with some new developers or developers pulled off another project. They set to work building their service to serve other teams in the company, and they make it a point to build a nice, properly-abstracted API with copious documentation.

Fast forward a few months, and development is _slow_. It's slow when you need changes, it's slow when you need to chase down the person who knows how this thing works, it's slow when it turns out that the service's API doesn't exactly map to your needs right now... The point is that in extracting your use-case to a generic service, you introduced friction and overhead. It's another abstraction that doesn't quite meet your needs - or anyone's - without them bending to the infrastructure's will. And if the infrastructure does bend to the will of its consumers, there are quickly a million parameters and config options and tons of documentation and oh my gosh I just wanted to do _x_, now I need to read all this and figure out how to integrate with _those guys_ in the team upstairs, who don't understand what I need and aren't on my timeline. Shucks. _How did we get here?_

So you ask _those guys_ (who used to be you, but never mind, because now they're _them_, and although we understand why _we_ do the things that we do, and when _we_ do hacks and make compromises for pragmatic reasons those are justified, but when _they_ do those things, well...why do _they_ not seem to care about writing good code?) - so you ask _those guys_ for a simple way to do what you want. Like, I get that there are a lot of options, you say. But the simple things should be easy and the hard things should be possible, right? Why can't the README just contain a short code snippet that will get me up and running and cover the 80% case, and I'll dig in to the documentation when I know I need specific things to differ from the defaults? Sounds obvious, no?

And those guys tell you...yes, we'd love to, but you need to understand, you have a very specific use-case. There are lots of other consumers of the infra, and they all need something different, so what do you want? I can't magically make the documentation simple for everyone!

Then you begin to understand that the cause of your pain is the push to turn parts of your application pipeline into reusable infrastructure. You notice that had you just kept that stuff inside your app, you wouldn't be spending all of this time on the overhead of integrating with another service. On the other hand...had you kept that stuff inside your app, it never would have been reused in other applications, which would presumably be even more inefficient when those other apps would have duplicated the functionality. On the other hand...sometimes you try to make things generic and you end up preparing for an eventuality that never appears. On the other hand...if you don't prepare for eventual reuse it'll never end up happening. People will just find another way to solve their immediate problems. On the other hand...there's [always another hand](https://youtu.be/TkiWIpiQjbQ?t=96). 

So what are we to do? Just flip a coin and decide? That's not a very confidence-inspiring approach, even if it might be honest about how well we know the future direction of our projects. There's got to be a better way. 

This leads me to my proposed rule of thumb, which I'll pompously name the **Greenwald Rule**, because apparently having an eponymous rule is the way you make it in this world. Here it is: 

_If there isn't an 80% case that can be made to **just work**, your service is too generic and shouldn't exist in its current form_.

If you can't give consumers a short snippet of code that just works for 80% of their needs, your service is trying to do too many unrelated things. You'd be better off splitting it into multiple services, or focusing only on a lower layer and not trying to solve all the problems for all the people.

Well...what do you think? I'm still working this out in my mind, it's just an idea.  The number is arbitrary, the rule is arbitrary, and please don't take this so seriously. But do think about it.

_Disclaimer, Disclosure, and other Fine Print: This post was not inspired by real events. Any resemblance to projects I may have or may not have worked on in the past, present, future, or whenever, is entirely coincidental and should not be inferred._
