Route:
```
https://ghoodies.herokuapp.com/cohorts/:gnum/students
```
Description:
Returns a simplified list of students with status

Returns:
```javascript

  {
    "name": "Daniel Gardner",
    "fulfilled": false,
    "size": "Large"
  },
  {
    "name": "Sasha Berkowitz",
    "fulfilled": false,
    "size": "XL"
  },
  {
    "name": "Deep Singh",
    "fulfilled": false,
    "size": "Large"
  },
  {
    "name": "Ryan Thissen",
    "fulfilled": false,
    "size": "XL"
  },
  {
    "name": "Thomas Stang",
    "fulfilled": false,
    "size": "XXL"
  },
  {
    "name": "Kevin Zheng",
    "fulfilled": false,
    "size": "Medium"
  }
]
```

Route:
```
https://ghoodies.herokuapp.com/students/name/:name
```
Description:
Returns a single student info by id search

Returns
```javascript
[
  {
    "id": 1,
    "name": "Daniel Gardner",
    "email": "daniel.marc.gardner@gmail.com",
    "size": "Large",
    "fulfilled": false,
    "cohort_id": 1,
    "created_at": "2017-03-08T02:33:25.705Z",
    "updated_at": "2017-03-08T02:33:25.705Z"
  }
]
```

Route:
```
https://ghoodies.herokuapp.com/students/:id
```
Description:
Returns a single student info by name search

Returns
```javascript
[
  {
    "id": 1,
    "name": "Daniel Gardner",
    "email": "daniel.marc.gardner@gmail.com",
    "size": "Large",
    "fulfilled": false,
    "cohort_id": 1,
    "created_at": "2017-03-08T02:33:25.705Z",
    "updated_at": "2017-03-08T02:33:25.705Z"
  }
]
```

Route:
```
https://ghoodies.herokuapp.com/students/
```
Description:
Returns all students regardless of cohort

Returns
```javascript
[
  {
    "id": 14,
    "name": "Alexander Krawiec",
    "email": "alexanderkrawiec@gmail.com",
    "size": "Large",
    "fulfilled": false,
    "cohort_id": 1,
    "created_at": "2017-03-08T16:54:46.783Z",
    "updated_at": "2017-03-10T00:42:32.706Z"
  },
  {
    "id": 11,
    "name": "Aom Sithanant",
    "email": "p.sithanant@gmail.com",
    "size": "Large",
    "fulfilled": false,
    "cohort_id": 1,
    "created_at": "2017-03-08T04:07:59.930Z",
    "updated_at": "2017-03-09T23:56:16.298Z"
  },
  {
    "id": 1,
    "name": "Daniel Gardner",
    "email": "daniel.marc.gardner@gmail.com",
    "size": "Large",
    "fulfilled": false,
    "cohort_id": 1,
    "created_at": "2017-03-08T02:33:25.705Z",
    "updated_at": "2017-03-08T02:33:25.705Z"
  },
  {
    "id": 9,
    "name": "Deep Singh",
    "email": "Gurdipsingh1990@gmail.com",
    "size": "Large",
    "fulfilled": false,
    "cohort_id": 1,
    "created_at": "2017-03-08T02:53:05.392Z",
    "updated_at": "2017-03-08T02:53:05.392Z"
  }
]
```

Route:
```
https://ghoodies.herokuapp.com/cohorts
```
Description:
Returns a list of the cohorts

Returns
```javascript
[
  {
    "id": 1,
    "gnum": "42"
  },
  {
    "id": 2,
    "gnum": "35"
  }
]
```
