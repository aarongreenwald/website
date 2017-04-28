const fs = require('fs');
const moment = require('moment');

fs.readFile(process.argv[2], (err, data) => {
  data = data.toString().split('\n').map(log => {
    try {
      return JSON.parse(log)
    } catch (e) {}
  })
    .filter(x => x && x.timestamp)
    .filter(x => x.timestamp > (new Date()).getTime() - (1000 * 60 * 60 * 24 * (process.argv[3] || 7)))
    .filter(x => !ignore(x));

  console.log(countby(data, 'ip').sort());
  console.log(countby(data, x => moment(x.timestamp).format('ll')).sort());
  console.log(countby(data, 'path').sort());
  console.log(countby(data, 'country').sort());

});

const countby = (data, predicate) => ({
  _data: data.reduce((acc, x) => {
    const key = typeof predicate === 'string' ? x[predicate] : predicate(x);
    acc[key] = (acc[key] || 0 ) + 1;
    return acc
  }, {}),
  sort: function() {
    return Object.keys(this._data)
      .sort((a, b) => this._data[a] < this._data[b] ? 1 : -1)
      .map(key => ({
        [key]: this._data[key]
      }));
  }
});

const ignore = x => {
  const hasIgnoredPath = ignoredPaths.some(ignoredPath => x.path.indexOf(ignoredPath) !== -1);
  const hasIgnoredUA = ignoredUA.some(iua => x.user_agent.ua.indexOf(iua) !== -1);
  return hasIgnoredPath || hasIgnoredUA
};

const ignoredPaths = ['robots.txt', 'wp-login', 'cgi-bin', 'favicon.ico'];
const ignoredUA = ['Twitterbot', 'uptimerobot'];