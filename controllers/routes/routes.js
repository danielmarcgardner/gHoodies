/*jshint esversion: 6 */

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || "development";
const CONFIG = require("../../knexfile.js")[ENV];
const KNEX = require('knex')(CONFIG);
const morgan = require('morgan');
const app = EXPRESS();

app.disable('x-powered-by');
ROUTER.use(bodyParser.json());
ROUTER.use(bodyParser.urlencoded({
    extended: true
}));

ROUTER.get('/students', (req, res) => {
    KNEX('students')
        .orderBy('name', 'asc')
        .then((students) => {
            res.status(200).json(students);
        })
        .catch((err) => {
            KNEX.destroy();
            console.error(err);
            res.status(500);
        });
});



// ROUTER.post('/students', (req, res) => {
//   let newStudent = {
//     name: req.body.name,
//     email: req.body.email,
//     size: req.body.size,
//     cohort_id: req.body.cohort_id
//   }
//   console.log(newStudent)
//   KNEX('students').insert(newStudent)
//   .then(() => {
//     KNEX('students').where('name', newStudent.name)
//     .then((studentToSend) => {
//       res.status(200).json(studentToSend)
//     })
//   })
//   .catch((err) => {
//       KNEX.destroy();
//       console.error(err);
//       res.status(500);
//   });
// })


ROUTER.get('/students/:id', (req, res) => {
    let id = Number.parseInt(req.params.id);

    if (!id) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        res.sendStatus(400);
    }

    KNEX('students')
        .where('id', id)
        .then((student) => {
            res.status(200).json(student);
        })
        .catch((err) => {
            KNEX.destroy();
            console.error(err);
            res.status(500);
        });
});

ROUTER.get('/students/name/:name', (req, res) => {
    let namewithspace = req.params.name

    function remover(named){
      let remove = named.split('%20')
      let unname = remove.join(' ')
      return unname
    }
    let name = remover(namewithspace)

    // console.log(name)

    if (!name) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        res.sendStatus(400);
    }

    KNEX('students')
        .where('name', name)
        .then((student) => {
            res.status(200).json(student);
        })
        .catch((err) => {
            KNEX.destroy();
            console.error(err);
            res.status(500);
        });
});

ROUTER.patch('/students/:id', (req, res) => {

    let id = Number.parseInt(req.params.id);

    if (!id) {
        res.set('Content-Type', 'text/plain');
        res.body = 'Bad Request';
        res.sendStatus(400);
    }

    KNEX('students')
        .where('id', id)
        .update(req.body)
        .then((data) => {
            KNEX('students')
                .where('id', id)
                .then((student) => {
                    res.status(202).json(student);
                });
        })
        .catch((err) => {
            KNEX.destroy();
            console.error(err.stack);
            return res.sendStatus(500);
        });
});

ROUTER.get('/cohorts/:gnum/students', (req, res) => {
    let gnum = Number.parseInt(req.params.gnum);
    KNEX('students')
        .innerJoin('cohorts', 'cohorts.id', 'students.cohort_id')
        .where(`gnum`, gnum)
        .select('name', 'fulfilled', 'size')
        .then((cohortStudents) => {
            res.status(200).json(cohortStudents);
        })
        .catch((err) => {
            KNEX.destroy();
            console.error(err);
            res.status(500);
        });
});

ROUTER.get('/cohorts', (req, res) => {
  KNEX('cohorts').select('id', 'gnum')
  .then((justCohort) => {
    res.status(200).json(justCohort)
  })
  .catch((err) => {
      KNEX.destroy();
      console.error(err);
      res.status(500);
  });
})

app.use((req, res) => {
    res.sendStatus(404);
});

module.exports = ROUTER;
