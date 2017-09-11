Notes on React Native EU 2017
9/9/2017
conferences talks

### Prologue

It's 6:18am, and I just took my seat on an aircraft about to depart Wroclaw's airport for Tel Aviv. I won the exit row lottery, so I'm stretching my feet out and enjoying the luxury of a seat that doesn't feel like I'm in a cattle car<sup>1</sup>. (_Yes, I speak English, and yes, I am willing and able to assist in case of emergency._) I have 63% left on my laptop battery, so now is as good a time as any to write a blog post. And why not? I'm on my way back from a great tech conference here in Poland and I have a lot to say.

For a moment I reflect on the ridiculous self-indulgence of this activity. I have a space on the Internet dedicated to recording ideas bouncing chaotically around my mind, and I convince myself that others will be interested in reading them. I can't quite figure out why, but it's as if there's a part of me that thinks this blog post _matters_. It's strange, but then I'm reminded of a great American president who [said something](https://www.youtube.com/watch?v=Ateh7hnEnik) akin to:

<div style="font-weight:bold;font-size:1.3em;line-height:1.3em;font-family:serif">
Why does Rice play Texas?...We choose to write blog posts in this decade and do the other things, not because they are meaningful, but because they are not.
</div>

 Well yeah. Pretty much sums it up, doesn't it?

### The Event

[React Native EU](https://react-native.eu/) was a two-day, single track conference hosted by [Callstack](https://callstack.io/) and focused entirely on issues affecting React Native developers.

From an organizational standpoint, I was incredibly impressed. It was the first time the Callstack team hosted a conference, but I wouldn't have known that if they hadn't told me. The event went on without a hitch, from technical logistics to food and parties. Plus, I got a free t-shirt and a Callstack-branded can of energy drink, so I'm going to consider  the conference a smashing success. Nothing makes a conference more worthwhile than a can of sugar, caffiene, and other mystery ingredients that'll probably kill me (but not before I use it to write a blog post on almost zero sleep...).

Speaking of swag, Callstack also gave speakers a really nice gift basket that included a few small bottles of what's presumably Polish product. I'm not quite sure what was in it, but it tasted fruity and packed quite an intoxicating punch. Unfortunately, the EU is kinda anal about liquids in carry-on luggage and in the process of putting the bottles in the infamous EU baggie, I dropped two of them. If you're going through security in Wroclaw right now and can't figure out why there's a sticky, sickly-sweet smell right after one of the metal detectors, now you know.

After the first day, there was a really nice after-party a quick bus ride away from the conference venue. Callstack provided busing for attendees, which was helpful because my Polish is limited to _nie_ and _dziękuję_. The location could not be beat. It was a quiet, grassy area right along the river, which coupled with a tasty barbecue set the stage for what I found to be one of the most enriching parts of the event: comparing notes with React Native developers from other teams all around the world. More on that later.

The crowd wasn't too big, but that's to be expected for a conference that specializes in a niche, developing technology. What it missed in attendee volume it more than made up for in attendee quality. The room was packed with the who's who of React Native and a whole lot of smart, dedicated developers that were all there to come together and figure out how React Native can be pushed to the next level. Which is exactly what we did.

_Hang on while I dismiss the MacOS calendar reminder that I have a flight leaving in one minute. Thanks for reminding me, but if I wasn't already here it wouldn't matter much, would it?_

### Polished React Native Apps

Quite a few of the talks focused on polishing user experience and performance issues in React Native, which really drove home the idea that the community is coalescing on a common set of problems that we need to solve together. For instance, [Jani Eväkallio](https://twitter.com/jevakallio) and [Tal Kol](https://twitter.com/koltal) both emphasized the importance of focusing on the finer details of UX, but from different sides of the same coin.

Jani talked about our expectations for React Native apps and how we must focus on polished user experiences, but also have reasonable expectations about what can be done. One of my favorite lines from his talk centered on why a React Native app can never have a better experience than a native app. He pointed out that by definition, native apps set the standards for what the user experience is "supposed" to be on a given platform, and that it would be impossible for a painter "to paint \[a portrait of\] Morgan Freeman that looks more like Morgan Freeman than Morgan Freeman \[himself\]." Indeed.

<div>
    <img src="/static/blog/rneu/never-better-than-native.jpg" alt="React Native can never be better than native" style="width: 50%;float:left;"/>
    <img src="/static/blog/rneu/good-enough.jpg" alt="But can it be good enough?" style="width: 50%;float:right;"/>
</div>
<span class="img-caption">You can't paint a Morgan Freeman that looks more like Morgan Freeman than Morgan Freeman</span>

Even so, he stressed that we *can* make apps that are good enough for our users if we focus on polished experiences and don't settle for less. Part of the reason this is challenging, he explained, isn't technical but business. We have constraints that come from real-world limitations on resources (capitalism) and those pressure us to make sacrifices we probably shouldn't. And unfortunately, this is even more prevalent in the React Native world than in general. Not necessarily because React Native is worse at great experiences, but because the kinds of businesses that choose to use React Native instead of traditional native development are often looking to save money and cut corners. As a community, we must resist this tendency or we risk React Native being perpetually thought of as one of those frameworks used to make cheap, "acceptable" apps instead of first-class experiences.

Tal took this same idea and built upon it by going down into the weeds and explaining, in technical terms, *why* React Native's asynchronous model poses performance challenges. He explained that this isn't a bug or an oversight in the React Native architecture, but a feature that offers a lot of flexibility and benefit. The problem is that in specific cases, the trade-off is small degradations in performance that are barely perceptible but threaten to relegate React Native apps to the "good enough" category.

He spoke about what we call "The Pepsi Challenge", modeled after that old game where a subject drinks some Coca Cola and Pepsi from unlabeled cups and are challenged to determine which is which. The idea is that if the two are sufficiently alike, the subject should not be able to tell the difference. This concept was brought to React Native by our team member [Ofir Dagan](https://twitter.com/ofirdagan2), who built a basic app in Objective-C and React Native and challenged the rest of us to determine which was which. It was difficult, but ultimately possible. Our goal is to work to narrow the gap enough so that users cannot identify a React Native app from a standard native app.

<img src="/static/blog/rneu/pepsi-challenge.jpg" alt="The Pepsi Challenge" style="width: 100%;"/>
<span class="img-caption">The Pepsi Challenge</span>

Tal proposed a solution using "synchronous rendering" that would resolve this issue by changing when data is sent across the bridge from the JS realm to the native realm and when logical flow is sync vs async. This isn't anything immediately usable in production, but is an important step forward in the discussion of how React Native balances the trade-offs it has to make. I'm excited to see how these ideas will develop among the community and what the core team will decide in the future.

### Scaling Mobile Development <small>(by yours truly)</small>

My own talk was about half way through the second day, and I spoke about how we at Wix have scaled our development process in a way that allows us to build a single app with a team of over 40 developers. The way I like to think of it, running a growing organization is like running a society. And that's not easy, but fortunately our society has had a few hundred years of practice since Thomas Jefferson and Alexander Hamilton butted heads about whether or not the newly formed USA should have a central bank.

<img src="/static/blog/rneu/presidents.jpg" alt="Hamilton vs Jefferson: The Great Debate" style="width: 100%;"/>
<span class="img-caption">
    "Hamilton feared anarchy and thought in terms of order; Jefferson feared tyranny and thought in terms of freedom." - Someone @ University of Groningen
 </span>

Wix's mobile team _does_ have a central <s>bank</s> UI library, but we don't regulate how teams manage their internal state or what set of lint rules they use. And our underlying philosophy of how teams should be given the freedom to do their own thing while still giving our users a cohesive experience drives our architectural decisions. You can see my slides [here](/slides/2017/rn-eu/scaling-rn), and if you'd like to discuss or get clarification please feel free to reach out to me.

I want to emphasize that the ideas in this talk are not mine; they were collectively developed by all of us in the mobile guild at Wix and were inspired by the ideas of other guilds within Wix and teams/orgs in the industry at large. I'm just the guy talking about it because...I don't know why. But I'm glad to have the opportunity to do it.

In any case, I had a great time on stage and I'm really appreciative to the audience for laughing a few times, being engaged, and all the feedback. If Twitter is to be believed at all, I spoke _really_ fast. This doesn't surprise me, because I've been hearing that I should slow down since I was, like, ten years old. I apologize to anyone who had a hard time following, especially to non-native English speakers who might need a bit of a slower pace to keep up. I'm going to work on throttling the pace a bit in the future.

### Q&A Panel

The conference wrapped up with a panel, instead of having Q&A at the end of each talk. At first I was skeptical, but I've been convinced that this was a great model. To provide a spectrum of perspectives for attendees' questions, the panel consisted of a cross-section of community leaders and experts from different backgrounds:

* [Eric Vicenti](https://twitter.com/EricVicenti) (Facebook)
* [Tal Kol](https://twitter.com/koltal) (Wix)
* [André Staltz](https://twitter.com/andrestaltz) (All-around awesome guy and important thinker in the community)
* [Ville Immonen](https://twitter.com/VilleImmonen) (Cofounder of [reindex.io](https://www.reindex.io/))

I especially liked hearing Eric and Tal bounce back and forth and share their respective perspectives on the future direction React Native can take to deal with challenges of performance, distribution, and more. Both of these men are dreamers and visionaries who like to look far into the future and imagine how React Native's core infrastructure can be changed to accommodate more of what we need. This stuff won't happen very quickly, but it's good to know there are people thinking far in advance. If you weren't there, I urge you to watch the video once it is published.

André brought a fresh perspective, which I appreciated. He sees the community and the userspace from a different angle, one that is directly connected to the needs of users who _aren't_ living in wealthy, developed countries and running the latest iPhone or Android device. This is important and cannot be overlooked. At one point, he commented that "The Web is Dead", a strong statement that he [explained](https://twitter.com/andrestaltz/status/905823932158275584) clearly on Twitter just a few minutes after the panel was over.

Someone asked about production monitoring of crashes, "if we have those." First of all, let me confirm that we most certainly _do_ have crashes (believe it or not, we aren't perfect), and I actually wrote a [blog post](/blog/sentry-new-relic-anodot-integration) about how I integrated Sentry with New Relic and Anodot to monitor those. Tal said that production monitoring is critical explained why he believes that you need to separate the monitoring of crashes that happen in native-land and that of errors that happen in JS-land and use tools tailor-made for the those respective tasks.

Another question that came up was about performance, and it was interesting to see broad consensus from the panel that the only real answer here is profiling. There is no one-size-fits-all answer to performance problems, because each app is unique and what presents a problem for one app might be a non-issue for another. Don't just run with some idea you saw on a blogpost that XYZ is bad for performance you should instead do ABC. Even if it's true, that might amount to a lot of work for a 2% gain in your case, if the real bottleneck is something else. So you need to measure, find the bottleneck, and address that.

Oh, and licensing came up, of course. In retrospect, I think Eric handled the question very well, given that it's (to my mind) and entirely unfair question to ask an engineer at a large, multinational corporation. I don't know much about the internal organizational structure at Facebook, but I strongly suspect that Eric and his coworkers are neither authorized nor qualified to answer questions about their employer's corporate policies, least of all those decided by people with law degrees.

### Knowledge Sharing

One thing I really enjoyed was looking at other people's apps and showing them ours, which gave us an opportunity to see how other organizations deal with (or don't deal with) the challenges we face in our app. Because we're far from perfect, and we face new challenges almost daily. It was nice to see that some of the issues we're facing are not unique to us, but even nicer to see that some of the problems we have are fixable without too much work.

Two instances of this from the conference afterparty stand out in my mind. First, I finally met Rafael Mendiola, a developer from Boston who I'd interacted with on Twitter but never met. He showed me what he's working on and we talked about how important it is to give users a consistent, coherent experience in your app and how you can build trust between your app and its users. I really liked some of the insight he had on this topic, but I don't feel I can do it justice repeating it so I'll leave that to him.

Then I met two developers from St Petersburg that work for Jetbrains on their issue tracker (YouTrack). I must be really tired right now, because I can't remember their names. But I do remember the app they showed me, which is a React Native client filled with features, and I couldn't help think that I REALLY wish Jira offered something similar. Atlassian, are you listening?

Of course, I got to reconnect with a bunch of members of the community I met previously, such as the one and only Ken. I'm not going to enumerate them all, just have a look at this picture. It's a subset of people I'm proud know by name.

<img src="/static/blog/rneu/friends-at-rneu.jpg" alt="Friends at React Native EU" style="width: 100%;"/>
<span class="img-caption">Just look at how cool those people are. I know, right?</span>


Best of all, it's great to hear or see people use open source libraries that came out of Wix Engineering, becauseit tells us that we're providing the community with value and speaking to a need that exists.

### Epilogue

I arrived back in Tel Aviv tired but exhilarated from what I feel was a successful and enriching conference experience. As I stepped off the plane onto the jetway, I was hit by a blast of hot air. It's about 35° C here in Tel Aviv! Later in the day, I took a walk on the boardwalk and felt compelled to take a picture of the sunset. I was only gone for three days, and I'm behaving like a tourist again? Apparently so.

<img src="/static/blog/rneu/tlv.jpg" alt="Sunset over the Mediterranean" style="width: 100%;"/>
<span class="img-caption">I'm a tourist in Tel Aviv again.</span>



--------------------
<div style="font-size:small">

<sup>1</sup>In retrospect, maybe that's an analogy I shouldn't make when leaving Poland, of all places. Oops.

</div>