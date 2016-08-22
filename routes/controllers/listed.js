const express = require('express');

const router = express.Router(); // eslint-disable-line
const db = require('../../utils/pg-promise-init.js').db;
const pgp = require('../../utils/pg-promise-init.js').pgp;
// cons moment = require('moment');
const query = require('../../sql/index').listed;
const _ = require('lodash');
const dbgeo = require('dbgeo');

const error404 = {
  message: 'Not Found',
  error: {
    status: 404,
  },
};
router.route('/listed')
  .get((req, res) => {
    db.any(query.all)
      .then((data) => {
        if (data.length === 0) {
          res.status(404).json(error404);
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

router.route('/listed/:gid([0-9]+)')
.get((req, res) => {
  const gid = parseInt(req.params.gid, 10);
  db.any(query.find, { gid })
  .then((data) => {
    if (data.length === 0) {
      res.status(404).json(error404);
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
});
router.route('/listed/search') //eslint-disable-line
.get((req, res) => {
  const queryParams = req.query;
  function defaultValues({
    sale = false,
    categoryId = 2,
    priceStart = 0,
    priceEnd = 2147483647,
    areaStart = 0,
    areaEnd = 2147483647,
    furnished = false,
    heatingSystem = false,
    airCondition = false,
    hasView = false,
    parking = false,
  }) {
    return {
      sale: sale === 'true',
      categoryId: parseInt(categoryId, 10),
      priceStart: parseInt(priceStart, 10),
      priceEnd: parseInt(priceEnd, 10),
      areaStart: parseInt(areaStart, 10),
      areaEnd: parseInt(areaEnd, 10),
      furnished: furnished === 'true',
      heatingSystem: heatingSystem === 'true',
      airCondition: airCondition === 'true',
      hasView: hasView === 'true',
      parking: parking === 'true',
    };
  }
  function replaceFalse() {
    const keys = Object.keys(this);
    for (const key of keys) {
      if (typeof this[key] === 'boolean' && key !== 'sale' && this[key] !== true) {
        this[key] = pgp.as.csv([true, false]);
      }
    }
  }
  const data = defaultValues(queryParams);
  replaceFalse.call(data);
  // const values = [true, false];
  // // const vTrue = [true];
  // // const vFalse = [false];
  // const data = {
  //   sale: queryParams.sale || false,
  //   categoryId: parseInt(queryParams.categoryId, 10),
  //   priceStart: 0,
  //   priceEnd: 80000,
  //   areaStart: 0,
  //   areaEnd: 500000,
  //   furnished: pgp.as.csv(values),
  //   hasView: pgp.as.csv(values),
  //   parking: pgp.as.csv(values),
  //   heatingSystem: true,
  //   airCondition: pgp.as.csv(values),
  // };
  // const gid = parseInt(req.params.gid, 10);
  db.any(query.search, data)
  .then((response) => {
    if (response.length === 0) {
      res.status(404).end();
    } else {
      dbgeo.parse(
        response,
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
});
router.route('/listed/stats/count')
.get((req, res) => {
  db.any(query.count)
  .then((response) => {
    if (response.length === 0) {
      res.status(404).end();
    } else {
      console.log('response', response);
      res.status(200).json(response);
    }
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  });
});
//
//
// router.route('/listings/all')
// .get((req, res) => {
//   db.one(query.total)
//   .then(data => {
//     const count = parseInt(data.count, 10);
//     res.status(200).json({
//       success: true,
//       msg: `total listings ${count}`,
//     });
//   })
//   .catch((error) => {
//     res.status(500).json({
//       success: false,
//       error: error.message || error,
//     });
//   });
// });

module.exports = router;
