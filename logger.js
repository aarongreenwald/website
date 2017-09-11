const ip2country = require('ip2country');
const uap = require('ua-parser-js');
const fs = require('fs');
const {Buffer} = require('buffer');
const fetch = require('node-fetch');

const isBot = ({ua, path}) => {
  const botUA = [
    'bot',
    'crawler',
    'spider',
  ];
  const botPaths = [
    'robots.txt',
    'wp-login',
    'wp-includes',
    'wp-content',
    'wp-admin',
    'cgi-bin',
    'a2billing',
    '.well-known/',
    '.php'
  ];
  return botUA.some(x => ua.toLowerCase().includes(x.toLowerCase())) || botPaths.some(x => path.toLowerCase().includes(x.toLowerCase()));
};

const encode = string => new Buffer(string).toString('base64');

let sendToMixPanel = function (event) {
  event.token = process.env.MP_TOKEN;
  if (event.token) {
    const data = encode(JSON.stringify([{
      event: 'request',
      properties: event
    }]));

    fetch(`http://api.mixpanel.com/track/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: `data=${data}`
    });
  }

};

module.exports = {
  log: req => {
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const ua = req.headers['user-agent'];
    const {path, query, headers} = req;
    const logData = {
      time: (new Date()).getTime(), //must be named 'time' for MP
      timestamp: new Date(), //formatted nicely for readability
      path,
      query,
      user_agent: uap(ua),
      isBot: isBot({ua, path}),
      referrer: headers['referer'] || headers['referrer'],
      ip, //special MP field,
      ip_address: ip, //readability
      country: ip2country(ip)
    };

    sendToMixPanel(logData);

    const logPath = logData.isBot ? process.env.BOT_LOGS : process.env.ACCESS_LOGS;
    if (logPath) {
      fs.appendFile(logPath, JSON.stringify(logData) + '\n', err => { if (err) console.error(err) });
    } else {
      console.log(logData);
    }
  },
  isBot
};

