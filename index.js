const express = require('express');
const app = express();
const partials = require('express-partials');
const compression = require('compression');
const blog = require('./blog-data');

app.use(compression());
app.use('/static', express.static('resources'));
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

app.get('/', (req, res) => res.render('home', {title: 'Home', description: strings.homeDescription}));

app.get('/projects', (req, res) => res.redirect(301, '/work'));
app.get('/resume', (req, res) => res.redirect(301, '/cv'));

app.get('/work', (req, res) => res.render('work', {title: 'Work', description: strings.workDesc}));
app.get('/cv', (req, res) => res.render('cv', {title: 'CV', description: strings.cvDesc}));
app.get('/talks', (req, res) => res.render('talks', {title: 'Talks', description: strings.talksDesc}));
app.get('/qr', (req, res) => res.render('qr', {layout: false}));


app.get('/blog', (req, res) => res.render('blog', {
  page: 'Blog',
  title: 'Blog',
  description: strings.blogDesc,
  posts: blog.posts,
  showingTag: null
}));

app.get('/blog/:slug', (req, res) => {
  const post = blog.posts.find(p => p.slug === req.params.slug);
  res.render('blog', {
    page: 'Blog',
    title: post.title,
    description: post.description,
    posts: null,
    post,
    showingTag: null
  })
});

app.get('/blog/tag/:tag', (req, res) => res.render('blog', {
  page: 'Blog',
  title: 'Blog', 
  description: `Posts tagged "${req.params.tag}" from Aaron Greenwald's coding blog`,
  posts: blog.posts.filter(p => p.tags.indexOf(req.params.tag) !== -1),
  showingTag: req.params.tag 
}));

app.listen(6540, () => console.log('Listening on 6540'));
