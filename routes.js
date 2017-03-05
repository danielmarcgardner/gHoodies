const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const bodyParser = require('body-parser');
ROUTER.use(bodyParser.json());

module.exports = ROUTER;
