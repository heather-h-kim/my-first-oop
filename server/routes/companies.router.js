const express = require('express');
const router = express.Router();
const companies = require('../modules/companies.data.js')


router.get('/', (req, res) => {
    res.send(companies);
});

module.exports = router;