const ip2country = require('ip2country');
const uap = require('ua-parser-js');
const fs = require('fs');


const isBot = ({ua, path}) => {
  const botUA = [
    'Twitterbot',
    'uptimerobot',
    'http://www.linkdex.com/',
    'http://www.bing.com/bingbot.htm',
    'http://www.google.com/bot.htm',
    'http://www.baidu.com/search/spider.html'
  ];
  const botPaths = [
    'robots.txt',
    'wp-login',
    'wp-content',
    'cgi-bin',
    'a2billing',
    '.well-known/',
    '.php'
  ];
  return botUA.some(x => ua.includes(x)) || botPaths.some(x => path.includes(x));
};

module.exports = {
  log: req => {
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const ua = req.headers['user-agent'];
    const {path, query, headers} = req;
    const log = {
      timestamp: (new Date()).getTime(),
      path,
      query,
      user_agent: uap(ua),
      referrer: headers['referer'] || headers['referrer'],
      ip,
      country: ip2country(ip)
    };

    const logPath = isBot({ua, path}) ? process.env.BOT_LOGS : process.env.ACCESS_LOGS;
    if (logPath) {
      fs.appendFile(logPath, JSON.stringify(log) + '\n', err => { if (err) console.error(err) });
    } else {
      console.log(log);
    }
  },
  isBot
};
