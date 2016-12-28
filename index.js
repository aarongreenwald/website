const express = require('express');
const partials = require('express-partials');
const app = express();
const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();
converter.setFlavor('github');

let posts = [];

const processPost = (slug, data) => {
  let md = false;
  if (slug.substr(slug.length - 3, 3) === '.md') {
    slug = slug.substr(0, slug.length - 3);
    md = true;
  }
  const split = data.split('\n');
  const title = split.shift();
  const date = split.shift();
  const tags = split.shift().split(' ');
  let content = split.join('\n');
  if (md) {
    content = converter.makeHtml(content);
  }
  return {
    slug,
    preview: content.substr(0, 450),
    title,
    date,
    tags,
    content
  };
};  

const readdir = path => new Promise((resolve, reject) => 
  fs.readdir(path, (err, result) => {
    if (err) {
      reject(err);
    }    
    resolve(result);
  })
);

const readfile = path => new Promise((resolve, reject) => 
  fs.readFile(path, 'utf-8', (err, result) => {
    if (err) {
      reject(err);
    }    
    resolve(result);
  })
);

readdir('./blog').then(posts => {
  const promises = [];
  posts.forEach(post => {
    const processedPost = readfile(`./blog/${post}`)
      .then(data => processPost(post, data));
    promises.push(processedPost);
  });
  return Promise.all(promises);    
})
.then(result => result.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1))
.then(result => posts = result)
.catch(console.error);  

app.use('/static', express.static('resources'));
app.use(partials());

app.set('views', './pages');
app.set('view engine', 'ejs');

const strings = {
  homeDescription: 'Aaron Greenwald is a software developer/programmer in Tel Aviv, Israel (formerly Washington, DC). This is his personal website',
  blogDesc: `Aaron Greenwald's blog about software, coding, and related topics`,
  cvDesc: `Aaron Greenwald's resume/professional bio - software developer, programmer`,
  projectsDesc: `Aaron Greenwald's coding projects and hobby software` 
};

app.get('/', (req, res) => res.render('home', {title: 'Home', description: strings.homeDescription}));

app.get('/projects', (req, res) => res.render('projects', {title: 'Projects', description: strings.projectsDesc}));
app.get('/cv', (req, res) => res.render('resume', {title: 'Resume', description: strings.cvDesc}));
app.get('/resume', (req, res) => res.render('resume', {title: 'CV', description: strings.cvDesc}));
app.get('/qr', (req, res) => res.render('qr', {layout: false}));


app.get('/blog', (req, res) => res.render('blog', {
  title: 'Blog', 
  description: strings.blogDesc, 
  posts, 
  showingTag: null 
}));

app.get('/blog/:slug', (req, res) => res.render('blog', {
  title: 'Blog', 
  description: strings.blogDesc, 
  posts: null,
  post: posts.find(p => p.slug === req.params.slug), 
  showingTag: null 
}));

app.get('/blog/tag/:tag', (req, res) => res.render('blog', {
  title: 'Blog', 
  description: strings.blogDesc, 
  posts: posts.filter(p => p.tags.indexOf(req.params.tag) !== -1),   
  showingTag: req.params.tag 
}));

app.listen(6540, () => console.log('Listening on 6540'));