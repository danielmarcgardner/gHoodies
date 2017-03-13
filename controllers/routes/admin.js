const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || "development";
const CONFIG = require("../../knexfile.js")[ENV];
// const KNEX = require('knex')(CONFIG);
const morgan = require('morgan');
const app = EXPRESS();

ROUTER.post('/admin', (req, res) => {
    let knex = require('knex')(CONFIG);
})

//WORKS
ROUTER.post('/admin/cohorts', (req, res) => {
    let knex = require('knex')(CONFIG);
    let newCohort = {
      gnum: req.body.gnum,
      type: req.body.type
    }
    knex('cohorts').insert(newCohort, '*')
    .then((insertedCohort) => {
      res.status(200).send(`You have successfully added ${insertedCohort[0].type} g${insertedCohort[0].gnum}`)
      // res.redirect('/admin')
    })
    .catch((err) => {
      console.log(err)
    })
})

//WORKS
ROUTER.delete('/admin/cohorts/:cohortID', (req, res) => {
  let knex = require('knex')(CONFIG);
  let cohortID = Number(req.params.cohortID)
  knex('cohorts').where('id', cohortID).del()
  .then((deletingCohort) => {
    res.status(200).send(`You have successfully deleted cohort with the id of ${cohortID}!`)
  })
  .catch((err) => {
    console.log(err)
  })
})
//WORKS
ROUTER.delete('/admin/students/:id', (req, res) => {
  let knex = require('knex')(CONFIG);
  let id = Number(req.params.id)
  knex('students').where('id', id).del()
  .then((deletingStudent) => {
    res.status(200).send(`You have successfully deleted the student at id ${id}`)
  })
  .catch((err) => {
    console.log(err)
  })
})
//WORKS
ROUTER.patch('/admin/students/:id', (req, res) => {
  let knex = require('knex')(CONFIG);
  let id = Number(req.params.id)
  knex('students').where('id', id).update('fulfilled', true)
  .then((updatedStudent) => {
    console.log(updatedStudent)
    res.status(200).send(`You have successfully fulfilled the order`)
  })
  .catch((err) => {
    console.log(err)
  })
})

module.exports = ROUTER;
