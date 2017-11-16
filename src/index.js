const express = require('express');
const app = express();
const partials = require('express-partials');
const compression = require('compression');
const blog = require('./blog-data');
const logger = require('./logger');
const {pages, talks} = require('./page-metadata');

app.use(compression());
app.use('/static', express.static('static'));
app.use('/slides-statics', express.static('static/slides', { maxAge: (60 * 60 * 24 * 90)}));

app.use((req, res, next) => {
  logger.log(req);
  next();
});
//serve static directory from disk for Let'sEncrypt's ssl verification
app.use('/.well-known', express.static('/var/www/html/.well-known'));
app.use(partials());
app.set('views', `${__dirname}/../pages`);
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('home', PageValues({title: 'Home', description: pages.homeDescription})));
app.get('/projects', (req, res) => res.redirect(301, '/work'));
app.get('/resume', (req, res) => res.redirect(301, '/cv'));
app.get('/work', (req, res) => res.render('work', PageValues({title: 'Work', description: pages.workDesc})));
app.get('/cv', (req, res) => res.render('cv', PageValues({title: 'CV', description: pages.cvDesc})));
app.get('/talks', (req, res) => res.render('talks', PageValues({title: 'Talks', description: pages.talksDesc})));
app.get('/qr', (req, res) => res.render('qr', {layout: false}));

app.get('/slides/:year/:event/:talk.html', (req, res) => res.redirect(301, req.path.replace('.html', '')));
app.get('/slides/:year/:event/:talk', (req, res) => res.render(req.path.slice(1), getSlidePageValues(req.params)));

app.get('/blog', (req, res) => res.render('blog', PageValues({
  title: 'Blog',
  description: pages.blogDesc,
  posts: blog.posts
})));
app.get('/blog/:slug', (req, res) => {
  const post = blog.posts.find(p => p.slug === req.params.slug);
  res.render('blog', PageValues({
    navPage: 'Blog',
    title: post.title,
    twitterCardImageUrl: post.twitterCardImageUrl || 'https://avatars3.githubusercontent.com/u/6300588?v=4&s=450',
    //only twitter should default to blogDesc, not standard description
    //because google doesn't like that
    twitterCardDescription: post.description || pages.blogDesc,
    description: post.description,
    post
  }));
});
app.get('/blog/tag/:tag', (req, res) => res.render('blog', PageValues({
  title: 'Blog',
  description: `Posts tagged "${req.params.tag}" from Aaron Greenwald's coding blog`,
  posts: blog.posts.filter(p => p.tags.indexOf(req.params.tag) !== -1),
  showingTag: req.params.tag 
})));

const PageValues = opts => Object.assign({
  title: opts.title || null,
  //default page to title,
  //field exists sometimes multiple titles are included in one page (Blog)
  navPage: opts.title || null,
  //default twitterCardDescription to page description if it's not overridden in opts
  twitterCardDescription: opts.description || null,
  //default twitterCardImageUrl to headshot if it's not overridden in opts
  twitterCardImageUrl: 'https://avatars3.githubusercontent.com/u/6300588?v=4&s=450',
  //some fields the ejs expects and will fail without
  description: null,
  posts: null,
  showingTag: null,
}, opts);
const SlidePageValues = opts => Object.assign({
  layout: 'slides/slide-template',
}, PageValues(opts));

const getSlidePageValues = ({year, event, talk}) => {
  const {title, description, thumbnail} = talks[year][event][talk];
  return SlidePageValues({
    title,
    description,
    twitterCardImageUrl: thumbnail || 'https://avatars3.githubusercontent.com/u/6300588?v=4&s=450'
  });

};

app.listen(6540, () => console.log('Listening on 6540'));
