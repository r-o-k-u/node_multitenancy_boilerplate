const  { Log } = require(  '../db/index');
const ipHelper  = require( './helpers/ip-helper.js');

module.exports = async (code, userId, errorMessage, level, req) => {
  let ip = 'no-ip';
  if(req !== '') ip = ipHelper(req);
  let log = {
    resultCode: code,
    level: level,
    errorMessage: errorMessage,
    ip: ip
  };

  if (userId !== '' && userId) log.userId = userId;

 /*  await log.save()
    .catch(err => {
      console.log('Logging is failed: ' + err);
    }); */
}
