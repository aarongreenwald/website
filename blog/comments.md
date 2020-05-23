Comments Are a Code Smell
11/24/2019
code 

>><span style="font-size:larger">"Comments are a code smell."</span>

        
>><span style="font-size:smaller">--_your team's principled developer_</span>

Well, I dunno. I think the smell was there before you wrote the comments. The comments are febreze. They cover the smell that was already there without actually fixing the problem, which is that your code is overcomplicated and confusing.

If you smell something stinky in your home, you should certainly search for the source and clean it properly. I can agree with that. But while you might be a better person than I, I'm not ashamed to admit that I still own some febreze<a href="#1_dest" name="1_source"><sup>1</sup></a>, because sometimes I just don't have the time or resources to fix the root of the problem. And when the codebase stinks, I'm not ashamed to spray some comments now and then. I just try not to rely on them when I don't have to.

-----------------------------

True story: The other day at work I was debugging a weird race-condition in our app when I came across a 50ms debounce that seemed suspect. Now why would this be here? I had no idea. But I was really appreciative of my coworker, who left a comment in the code saying that the debounce was necessary to fix a certain bug along with a link to the bug report. So I followed the link, which opened a bug with hardly any details. Fortunately it was linked to another bug...which also had almost no details. But I did find a link from the second bug to a pull request, which included a description of what the issue was and why the debounce needed to be there. And then I noticed something interesting: the only reason I found the PR altogether was because of the comment, but the comment wasn't originally included by the author. The reviewer of the PR commented before approving:

_I think there should be a comment that explains why this is here. It's to fix a bug that...[edited]..., and a future reader will wonder what the point is and why you need a debounce. It's not obvious._

So the author added the comment and the reviewer approved the PR. The really interesting bit? The reviewer was me. I didn't remember it at all until I saw my code review. 

Moral: If you need the febreze, you need it. The person you help might just be yourself. 

<small><a href="#1_source" name="1_dest"><sup>1</sup></a> That's a lie. I own a generic febreze knockoff, because I'm a cheapass. But you get the point.</small> 


