const express = require('express');
const router = express.Router(); // eslint-disable-line
const db = require('../../utils/pg-promise-init.js').db;
const query = require('../../sql/index').category;


// Categories
router.route('/category')
.get((req, res) => {
  db.many(query.category)
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


// SubCategories
router.route('/category/:id')
.get((req, res) => {
  const parentId = parseInt(req.params.id, 10);
  db.any(query.subcategory, [parentId])
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

module.exports = router;
