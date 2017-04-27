const express = require('express');
const app = express();
const partials = require('express-partials');
const compression = require('compression');
const blog = require('./blog-data');
const ip2country = require('ip2country');
const uap = require('ua-parser-js');
const fs = require('fs');

app.use(compression());
app.use('/static', express.static('resources'));
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const log = {
    timestamp: (new Date()).getTime(),
    path: req.path,
    query: req.query,
    user_agent: uap(req.headers['user-agent']),
    referrer: req.headers['referer'] || req.headers['referrer'],
    ip,
    country: ip2country(ip)
  };
  fs.appendFile('./access_logs.log', JSON.stringify(log) + '\n', err => { if (err) console.error(err) });
  next();
});

app.use('/slides', express.static('slides'));
//serve static directory from disk for Let'sEncrypt's ssl verification
app.use('/.well-known', express.static('/var/www/html/.well-known'));
app.use(partials());

app.set('views', './pages');
app.set('view engine', 'ejs');

const strings = {
  homeDescription: 'Official website of Aaron Greenwald, a software developer/programmer in Tel Aviv, Israel (formerly Washington, DC).',
  blogDesc: `Aaron Greenwald's sparsely populated blog about software, coding, and more. Sometimes sarcastic, occasionally entertaining, always enlightening.`,
  cvDesc: `Aaron Greenwald's resume/professional bio - software developer, programmer.`,
  workDesc: `Aaron Greenwald's coding projects and hobby software.`,
  talksDesc: `̄A selection of Aaron Greenwald's public appearances: talks and workshops`
};

app.get('/', (req, res) => res.render('home', PageValues({title: 'Home', description: strings.homeDescription})));

app.get('/projects', (req, res) => res.redirect(301, '/work'));
app.get('/resume', (req, res) => res.redirect(301, '/cv'));

app.get('/work', (req, res) => res.render('work', PageValues({title: 'Work', description: strings.workDesc})));
app.get('/cv', (req, res) => res.render('cv', PageValues({title: 'CV', description: strings.cvDesc})));
app.get('/talks', (req, res) => res.render('talks', PageValues({title: 'Talks', description: strings.talksDesc})));
app.get('/qr', (req, res) => res.render('qr', {layout: false}));


app.get('/blog', (req, res) => res.render('blog', PageValues({
  title: 'Blog',
  description: strings.blogDesc,
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
    twitterCardDescription: post.description || strings.blogDesc,
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

app.listen(6540, () => console.log('Listening on 6540'));
