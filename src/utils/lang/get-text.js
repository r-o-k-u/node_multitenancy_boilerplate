const  en = require( './en.js');
const sw = require( './sw.js');

module.exports = (lang, key) => {
  if (lang == 'sw') {
    return sw[key];
  } else {
    return en[key];
  }
};
