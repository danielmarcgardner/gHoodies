/*jshint esversion: 6 */

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || "development";
const CONFIG = require("../../knexfile.js")[ENV];
// const KNEX = require('knex')(CONFIG);
const morgan = require('morgan');
const app = EXPRESS();
const path = require('path');
const joinPath = path.join(__dirname, '../../index.html');

app.disable('x-powered-by');
ROUTER.use(bodyParser.json());
ROUTER.use(bodyParser.urlencoded({
    extended: true
}));

function remover(named){
  let remove = named.split('%20')
  let unname = remove.join(' ')
  return unname
}

app.use('/', EXPRESS.static('./'))

ROUTER.get('/students', (req, res) => {
    let knex = require('knex')(CONFIG);

    knex('students')
        .orderBy('name', 'asc')
        .then((students) => {
            return res.status(200).json(students);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500);
        })
        .finally(function() {
            knex.destroy();
        });
});

ROUTER.post('/students', (req, res) => {
  console.log(req.body);
  let name = req.body.firstName + " " + req.body.lastName
    if (!name ||  !req.body.email || !req.body.size || !req.body.cohort_id) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        return res.sendStatus(400);
    }

    let knex = require('knex')(CONFIG);

    let newStudent = {
        name: name,
        email: req.body.email,
        size: req.body.size,
        cohort_id: req.body.cohort_id
    }
    console.log(newStudent);
    knex('students').insert(newStudent)
        .then(() => {
            res.redirect('/');
            })
        .catch((err) => {
            knex.destroy();
            console.error(err);
            res.status(500);
        });
})

ROUTER.get('/students/:id', (req, res) => {
    let knex = require('knex')(CONFIG);
    let id = Number.parseInt(req.params.id);

    if (!id) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        return res.sendStatus(400);
    }

    knex('students')
        .where('id', id)
        .then((student) => {
            return res.status(200).json(student);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500);
        })
        .finally(function() {
            knex.destroy();
        });
});

ROUTER.get('/students/name/:name', (req, res) => {
    let namewithspace = req.params.name

    function remover(named) {
      let remove = named.split('%20')
      let unname = remove.join(' ')
      return unname
    }

    let name = remover(namewithspace)

    if (!name) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        return res.sendStatus(400);
    }

    let knex = require('knex')(CONFIG);

    knex('students')
        .where('name', name)
        .then((student) => {
            return res.status(200).json(student);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500);
        })
        .finally(function() {
            knex.destroy();
        });
});

ROUTER.patch('/students/:idStudent', (req, res) => {
    let idStudent = Number.parseInt(req.params.idStudent);

    if (!idStudent) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        return res.sendStatus(400);
    }

    let knex = require('knex')(CONFIG);
    let id = req.body.id;

    let updated = {
      cohort_id: Number(req.body.cohort_id),
      size: req.body.size,
      id: req.body.id,
      created_at: req.body.created_at,
      fulfilled: false,
      name: req.body.name,
      email: req.body.email,
      updated_at: knex.fn.now()
    }

    knex('students')
        .where('id', id)
        .update(updated)
        .then((data) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err.stack);
            return res.sendStatus(500);
        })
        .finally(function() {
            knex.destroy();
        });
});

ROUTER.get('/cohorts/:gnum/students', (req, res) => {
    let gnum = Number.parseInt(req.params.gnum);

    if (!gnum) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        return res.sendStatus(400);
    }

    let knex = require('knex')(CONFIG);

    knex('students')
			.join('cohorts', 'cohorts.id', '=', 'students.cohort_id')
			.select('name', 'fulfilled', 'size').where('cohort_id', gnum)
        .then((cohortStudents) => {
            return res.status(200).json(cohortStudents);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500);
        })
        .finally(function() {
            knex.destroy();
        });
});

ROUTER.get('/cohorts', (req, res) => {
    let knex = require('knex')(CONFIG);

    knex('cohorts').select('id', 'gnum')
        .then((justCohort) => {
            return res.status(200).json(justCohort)
        })
        .catch((err) => {
            console.error(err);
            return res.status(500)
          })
          .finally(function() {
            knex.destroy()
          })
        })

app.use((req, res) => {
  return res.sendStatus(404)
});

module.exports = ROUTER
