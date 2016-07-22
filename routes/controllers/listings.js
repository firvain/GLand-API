const express = require('express');
const router = express.Router(); // eslint-disable-line
const db = require('../../utils/pg-promise-init.js').db;
// cons moment = require('moment');
const query = require('../../sql/index').listings;
const _ = require('lodash');
const dbgeo = require('dbgeo');

router.route('/listings')
.get((req, res) => {
  db.any(query.all)
  .then((data) => {
    if (data.length === 0) {
      res.status(404);
    } else {
      dbgeo.parse(
        data,
        {
          geometryType: 'geojson',
          geometryColumn: 'geom',
        },
          (error, result) => {
            res.status(200).json(result);
            return true;
          });
    }
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  });
})
.post((req, res) => {
  const obj = {};
  const now = new Date();
  obj.property_gid = _.lowerCase(req.body.property_gid);
  obj.sale = _.lowerCase(req.body.sale) || false;
  obj.start_date = req.body.start_date || now;
  obj.end_date = req.body.end_date || null;
  obj.short = _.lowerCase(req.body.short) || false;
  obj.pets = _.lowerCase(req.body.pets) || false;
  db.tx(t => {
    // this = t = task protocol context;
    // this.ctx = task config + state context;
    const q1 = t.one('select * from properties where gid=$1', [obj.property_gid]);
    const q2 = t.one(query.add, obj);
    return t.batch([q1, q2]);
  })
.then((events) => {
  res.status(200).json(events);
})
.catch((error) => {
  res.status(500).json({
    success: false,
    error: error.message || error,
  });
});
});

router.route('/listings/:id')
.get((req, res) => {
  const id = parseInt(req.params.id, 10);
  db.any(query.find, { id })
  .then((data) => {
    if (data.length === 0) {
      res.status(404);
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


router.route('/listings/all')
.get((req, res) => {
  db.one(query.total)
  .then(data => {
    const count = parseInt(data.count, 10);
    res.status(200).json({
      success: true,
      msg: `total listings ${count}`,
    });
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  });
});

module.exports = router;
