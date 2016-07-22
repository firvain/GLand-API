const express = require('express');
const router = express.Router(); // eslint-disable-line
// const debug = require('debug')('server:server');
const db = require('../../utils/pg-promise-init.js').db;
const pgp = require('../../utils/pg-promise-init.js').pgp;
const query = require('../../sql/index').users;
const _ = require('lodash');

// function assignDefaults({
//   firstName = null,
//   lastName = null,
//   phone = null,
//   fax = null,
//   email = null,
//   streetName = null,
//   streetNumber = null,
//   psCode = null,
//   city = null,
//   country = null,
//   isActive = true,
//   isAgency = false,
//   }) {
//   return { firstName, lastName, phone, fax, email, streetName, streetNumber, psCode,
//     city, country, isActive, isAgency,
//   };
// }
function* objectEntries(obj) {
  const propKeys = Reflect.ownKeys(obj);

  for (const propKey of propKeys) {
    // `yield` returns a value and then pauses
    // the generator. Later, execution continues
    // where it was previously paused.
    yield [propKey, obj[propKey]];
  }
}

router.route('/users')
.get((req, res) => {
  db.any(query.all)
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
})
.post((req, res) => {
  const columns = [];
  const values = [];

  for (const [key, value] of objectEntries(req.body)) {
    if (value.length !== 0) {
      columns.push(_.snakeCase(key));
      values.push(pgp.as.value(value));
    }
  }
  // console.log('title', values.map(pgp.as.value).join());
  // const obj = assignDefaults(_.mapValues(req.body, _.method('toLowerCase')));
  db.one(query.add, {
    columns: columns.map(pgp.as.name).join(),
    values: values.map(i => `'${i}'`).join(),
  })
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  });
});


router.route('/users/:user_id')
.get((req, res) => {
  const id = parseInt(req.params.user_id, 10);
  db.oneOrNone(query.find, [id])
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
})
.delete((req, res) => {
  const id = parseInt(req.params.user_id, 10);
  db.oneOrNone(query.delete, [id])
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
})
.patch((req, res) => {
  const id = parseInt(req.params.user_id, 10);
  const obj = {};
  obj.id = id;
  const columns = [];
  const values = [];

  for (const [key, value] of objectEntries(req.body)) {
    if (value.length !== 0) {
      columns.push(_.snakeCase(key));
      values.push(pgp.as.value(value));
    }
  }
  db.oneOrNone(query.update, {
    columns: columns.map(pgp.as.name).join(),
    values: values.map(i => `'${i}'`).join(),
    id: pgp.as.value(id),
  })
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

// router.route('/users/:user_id/:property_id')
// .get((req, res, next) => {
//   const user_id = req.params.user_id;
//   const property_id = req.params.property_id;
//   res.send(`id ${user_id} --- property_id ${property_id}`);
// });
// router.param('user_id', function (req, res, next, user_id) {
//   console.log('CALLED ONLY ONCE at user_id '+ user_id);
//   next();
// });
// router.param('property_id', function (req, res, next, property_id) {
//   console.log('CALLED ONLY ONCE at property_id '+ property_id);
//   next();
// });

module.exports = router;
