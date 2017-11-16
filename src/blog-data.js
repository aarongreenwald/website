const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();
converter.setFlavor('github');
const moment = require('moment');

let posts = [];

const processPost = (slug, data) => {
  let md = false;
  if (slug.substr(slug.length - 3, 3) === '.md') {
    slug = slug.substr(0, slug.length - 3);
    md = true;
  }
  const split = data.split('\n');
  const title = split.shift();
  const date = new Date(split.shift());
  const tags = split.shift().split(' ');
  let content = split.join('\n');
  if (md) {
    content = converter.makeHtml(content);
  }
  const PREVIEW_LENGTH = 700;
  return {
    slug,
    preview: content.length > PREVIEW_LENGTH + 1 ? content.substr(0, content.indexOf('. ', PREVIEW_LENGTH) + 1) : content,
    //TODO * 3
    description: null,
    twitterCardImageUrl: null,
    twitterCardDescription: null,
    title,
    date,
    formattedDate: moment(date).format('ll'),
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

readdir('../blog').then(posts => {
  const promises = [];
  posts.forEach(post => {
    const processedPost = readfile(`./blog/${post}`)
      .then(data => processPost(post, data));
    promises.push(processedPost);
  });
  return Promise.all(promises);
})
  .then(result => result.sort((a, b) => a.date < b.date ? 1 : -1))
  .then(result => posts = result)
  .catch(console.error);

module.exports = {
  get posts() {
    return posts;
  }
};