const express = require('express');

const router = express.Router(); // eslint-disable-line
const db = require('../../utils/pg-promise-init.js').db;
const query = require('../../sql/index').isochrones;

router.route('/isochrones')
.get((req, res) => {
  const queryParams = req.query;
  const data = {
    x: parseFloat(queryParams.x),
    y: parseFloat(queryParams.y),
    time: parseInt(queryParams.time, 10),
  };
  db.any(query.find, data)
  .then((result) => {
    if (result.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(result[0]);
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
