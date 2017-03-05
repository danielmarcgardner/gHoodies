const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || "development";
const CONFIG = require("./knexfile.js")[ENV];
const KNEX = require('knex')(CONFIG);
ROUTER.use(bodyParser.json());
ROUTER.use(bodyParser.urlencoded({
  extended: true
}));


ROUTER.get('/students', (req, res) => {
  KNEX('students').then((students) => {
    res.status(200).json('students')
  }).catch((err) => {
    console.error(err);
    res.status(500);
  })
});

ROUTER.get('/cohorts/:gnum', (req, res) => {
  let gnum = Number.parseInt(req.params.gnum);
  KNEX('students').innerJoin('cohorts', 'cohorts.id', 'students.cohort_id').where(`gnum`,'=', `${gnum}`).select('name', 'size').then((cohortStudents) => {
    res.status(200).json('cohortStudents')
  }).catch((err) => {
    console.error(err);
    res.status(500);
  })
});

module.exports = ROUTER;
