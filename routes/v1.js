const express = require('express');

const router = express.Router(); // eslint-disable-line
// const config = require('../config/config');

const users = require('./controllers/users');
const categories = require('./controllers/categories');
const listings = require('./controllers/listings');
const listed = require('./controllers/listed');
const estates = require('./controllers/estates');

router.use('/', categories);
router.use('/', users);
router.use('/', listings);
router.use('/', estates);
router.use('/', listed);

module.exports = router;
