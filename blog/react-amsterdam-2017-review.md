React Amsterdam 2017: A Quick Review
4/26/2017
conferences talks

Last week I had the pleasure of speaking at [React Amsterdam](https://react.amsterdam), a conference about (wait for it) React that takes place in (you'll never guess) Amsterdam. Here's my quick review. 

The super-short version: I had a great time and I hope to go again. And if you missed it, well, there's always next year. But you needn't wait that long! After you watch all the talks on the conference's [YouTube channel](https://www.youtube.com/channel/UCsFrt8oKNYXGspSlX9u6uXw), you can buy tickets to [AmsterdamJS](https://amsterdamjs.com/), a conference hosted by the [same group of amazing people](https://frontendamsterdam.com/). It's happening in just a bit over a month, so [get your tickets](https://www.eventbrite.com/e/amsterdamjs-conference-2017-tickets-32375653451?aff=sitebtn) now.

## The Event

<img alt="Huge Conference!" src="//i.imgflip.com/1nuovm.jpg"/>

It was yuuuuge. I heard through the grapevine that the organizers originally expected only a few hundred people, and turnout was somewhere well above one thousand. But if the organizers weren't originally planning to handle such a large crowd, it didn't show. They scaled very well, and ran an incredibly smooth and professional event. Special shoutout to team members [Diana Trubnikova](https://www.linkedin.com/in/dianatrubnikova/) and [Robert Haritonov](https://twitter.com/operatino), who helped me with logistics, arrangements, and all around did an amazing job making the event run so smoothly.

There were two tracks, running parallel all day in two separate rooms. In the main hall was the React track, focusing on all things React that didn't fit in the second track: React Native. As a React Native developer and speaker, I spent most of my time in the React Native track, but I did pop in to the main hall now and again to appreciate the immensity of the event. Words cannot do justice to just how big it was, and even Donald Trump would probably have been without words to describe the magnitude of React Amsterdam. <a href="https://youtu.be/7UIE_MRAhEA?t=49s">And he has the best words.</a> 

So no words. But there were lots of pictures, which you can find on twitter. <a href="https://twitter.com/mxstbr/status/855357245873426432">Here's one.</a> <a href="https://twitter.com/aaronjgreenwald/status/855339134877138945">And here's another.</a> <a href="https://twitter.com/codehipsters/status/855455282658463744>And another.</a> You get the point.



### Speaker Treatment

If you're considering responding to a CFP from the Frontend Amsterdam organization, I can only say positive things about the experience. Let me summarize it thusly: I slept on a boat. How cool is that? Very cool. Right? Right.

When I arrived in Amsterdam the day before the conference, I went straight to the address Diana had sent me for the hotel they booked for me. Had I actually read the link to the hotel's info she included in the email, I might not have been surprised to find just a quaint, romantic looking boat docked at the pier.
 
 <img alt="My Hotel in Amsterdam" src="//r.bstatic.com/images/hotel/max1024x768/446/44615195.jpg" width="100%"/>
 
 In the evening we had a really nice speakers' dinner (fantastic food, in fact) while the captain/chef took the boat for a cruise around Amsterdam. 
  
  The next morning, the conference organizers arranged for a special ferry to take us from our _boatel_ (you heard that word here first) to the conference. Check out [this tweet](https://twitter.com/codehipsters/status/855311145455857664) with a picture of me on the boat. 
  
  P.S. Compared to Tel Aviv, Amsterdam is _freezing_.

### Swag

As you most certainly know, the main point of a conference is the acquisition of cheap pens and cheaper post-it notes. In this regard, I unfortunately did not have a very good experience. There may have been cool swag there, but I was so busy running around talking with people that I have no idea. I left the conference with absolutely zero crap that I didn't have when I arrived in the morning. Sad! 

<img alt="Sad!" src="//i.imgflip.com/1nur7v.jpg" />

## My Talk

I talked about Testing & React Native. I tried to tell the story of our experience at Wix trying to TDD our React Native app - the challenges, the solutions, where we stand now.

Personally, I feel I've had better performances. Sometimes I get off stage and feel like I did my best and delivered a great talk, and sometimes I feel like I could have done better. But that's for the audience to decide. I hope I properly conveyed my perspective on the state of React Native testing: that although it's not perfect, it's made a lot of progress, and that there are many workable options. 

I do believe that at this point, there's no excuse for not testing a React Native app. Especially if you architect your app properly, you should be able to get reasonable coverage without making yourself crazy. And I'm big on detox, the UI Automation framework my colleagues at Wix are working on. Although I'm not involved in the development of this library, I do use it and see the power it brings to UI Automation testing on mobile.
 
 After the talk, some of the audience came to discuss my talk with me, and we had a nice discussion about the place of Enzyme shallow rendering in a developers testing toolkit. They made good points, and I want to clarify that it was not my intention to be entirely negative about Enzyme testing in React Native. In fact, I do write Enzyme component tests at work and I find them helpful, even though I wish I could do a full mount instead of just shallow rendering. 
 
 At the same time, I do believe that for someone just getting started, it's better to focus their efforts on detox testing and vanilla JS tests at the outset.
 
Special thanks to [Mikhail Larchanka](https://twitter.com/MLarchanka) for helping me with the rehearsal before the conference. My delivery wasn't perfect, but it was definitely greatly improved by the rehearsal and his feedback.  

## Other Talks

The good thing about going late in the day is that you have plenty of time to prepare and tweak things throughout the day before you get on stage. The bad thing about going late in the day is that you have plenty of time to prepare and tweak things throughout the day before you get on stage.

In other words, I didn't listen to as many of the other talks as I would have liked because I was too busy getting <s>stressed</s> excited for my talk. And apparently I was indeed excited, because [this reviewer](https://medium.com/@donovan_tc/react-amsterdam-2017-review-react-native-track-4797978bcf56) says I literally jumped on to the stage. 

Even so, I did hear significant parts of quite a few talks, and I want to highlight two of them that I really liked. 

Ram from Microsoft spoke about CI/CD and the deployment lifecycle in React Native. This is a topic I really care about, and I'm glad to hear about the progress his team at Microsoft has made in this area. It's definitely worth a listen.

Tal Kol gave us perspective on React Native performance. This is critical to any RN developer to understand, and is definitely worth a listen if you are working with React Native.

Other talks I managed to get to and really enjoyed were Gant Laborde's talk about React Native dev tools and Mike Grabowski's talk on Universal React. 

## The Most Important Thing

The most valuable part of conference attendance, in my opinion, is not the talks but the informal conversations you can have with experts in the field. After all, you can always watch the talks on YouTube afterwards. But the opportunity to meet innovators and leaders in the community? That's what conferences are all about. 

For me, it was an honor to get to be part of React Amsterdam this year, because it gave me an opportunity to meet people whose names I recognized but never met. Michel Westrate, for example, is the creator of mobx. Mike Grabowski heads callstack.io, and Gant Laborde is a speaker and author I've seen around. Max Stoiber is another big name in  the community I've seen on Twitter and finally got to meet. And then there's Ken Wheeler, who's one of the most fun people I've met in a while. And a great speaker. Of course that's just a partial list of the awesomeness packed into one shipyard for a day. Those are just some of the names I recognize that I can now add a face to. Of course, I met a whole bunch of new people I hadn't recognized prior and am now following on twitter. 

So there you have it. All in all, a great experience. Follow me on twitter to keep up to date with future adventures!