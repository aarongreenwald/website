const fs = require('fs');
const moment = require('moment');
const chart = require('chart');
const {isBot} = require('../logger');

const [, , logFile, daysIncluded] = process.argv;
fs.readFile(logFile, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  data = data
    .toString()
    .split('\n')
    .map(log => {
      try {
        return JSON.parse(log)
      } catch (e) {}
    })
    .filter(x =>
      x &&
      x.timestamp &&
      x.timestamp > (new Date()).getTime() - (1000 * 60 * 60 * 24 * (daysIncluded || 7)) &&
      !ignore(x)
    );

  console.log('IP Addresses with Most Traffic');
  console.log('==============================');
  console.log(countby(data, 'ip').sort().slice(0, 5));
  console.log('By Date');
  console.log('==============================');
  console.log(countby(data, x => moment(x.timestamp).format('ll'))._data);
  const chartData = countby(data, x => moment(x.timestamp).startOf('day').toDate().getTime())._data;
  console.log(chart(Object.keys(chartData).sort().map(key => chartData[key]), {
    width: 80,
    pointChar: '█',
  }));
  console.log('By Page');
  console.log('==============================');
  console.log(countby(data, 'path').sort());
  console.log('By Country');
  console.log('==============================');
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

const ignore = ({user_agent, path}) => isBot({ua: user_agent.ua, path}) ||
  ignoredPaths.some(ignoredPath => path.includes(ignoredPath));

const ignoredPaths = [
  'favicon.ico',
  '.js',
  '.css',
  '.json',
  '.jpg',
  '.png',
  '.gif',
];