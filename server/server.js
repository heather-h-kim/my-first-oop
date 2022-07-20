const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const guests = require('./routes/guests.router.js');
const companies = require('./routes/companies.router.js');
const templates = require('./routes/templates.router.js');
const PORT = process.env.PORT || 5000;


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/guests', guests);
app.use('/companies', companies);
app.use('/templates', templates)
/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});