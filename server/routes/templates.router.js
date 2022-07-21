const express = require('express');
const router = express.Router();
const templates = require('../modules/templates.data.js')


router.get('/', (req, res) => {
    console.log(templates);
    res.send(templates);
});

//Add a new template message
router.post('/', (req, res) => {
    console.log('in templates route');
    console.log('req.body is', req.body);
    let id = templates.length + 1;
    let type = req.body.type;
    let message = req.body.message;

    templates.push({
        id: id,
        type: type,
        message: message
    })
    
    console.log(templates);
    res.sendStatus(201);
})

module.exports = router;