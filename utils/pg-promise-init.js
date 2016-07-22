const promise = require('bluebird');
const config = require('../config/config');
const options = {
  promiseLib: promise,
  // error(error, e) {
  //   if (e) {
  //     logger.error(e);
  //     logger.error(error);
  //   }
  // },
};
const pgp = require('pg-promise')(options);
pgp.pg.defaults.poolSize = 25;

const diag = require('./pg-diagnostics');
diag.init(options);
const db = pgp(config.connection);
module.exports = {
  pgp,
  db,
};
