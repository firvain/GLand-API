const express = require('express');

const router = express.Router(); // eslint-disable-line
const db = require('../../utils/pg-promise-init.js').db;
const query = require('../../sql/index').properties;


router.route('/estates')
.get((req, res) => {
  db.any(query.all)
  .then((data) => {
    if (data.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(data);
    }
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  });
});


router.route('/estates/:id')
.get((req, res) => {
  const id = parseInt(req.params.id, 10);
  db.oneOrNone(query.find, { id })
  .then((data) => {
    if (data === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(data);
    }
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  });
});

module.exports = router;
