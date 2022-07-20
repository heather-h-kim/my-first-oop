const express = require('express');
const router = express.Router();
const guests = require('../modules/guests.data.js')


router.get('/', (req, res) => {
    console.log(guests);
    res.send(guests);
});

module.exports = router;