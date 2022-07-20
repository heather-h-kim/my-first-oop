const express = require('express');
const router = express.Router();
const templates = require('../modules/templates.data.js')


router.get('/', (req, res) => {
    console.log(templates);
    res.send(templates);
});

module.exports = router;