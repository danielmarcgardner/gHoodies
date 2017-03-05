
exports.seed = function(knex, Promise) {
  return knex('cohorts').del()
  .then( function() {
    return knex('students').del()
    .then( function() {
      return knex('cohorts').insert([
        {
          gnum: 42,
          type: 'wds'
        },
        {
          gnum: 35,
          type: 'wds'
        }
      ])
      .then( function() {
        return knex('students').insert([
          {
            name: 'Daniel Gardner',
            email: 'daniel.marc.gardner@gmail.com',
            size: 'Large',
            fulfilled: false,
            cohort_id: 1
          },
          {
            name: 'Matt Muir',
            email: 'mmuhr88@gmail.com',
            size: 'XL',
            fulfilled: false,
            cohort_id: 1
          },
          {
            name: 'Randall Spencer',
            email: 'randallspencer@gmail.com',
            size: 'Large',
            fulfilled: false,
            cohort_id: 1
          },
          {
            name: 'Thomas Stang',
            email: 'stang.tk@gmail.com',
            size: 'XL',
            fulfilled: false,
            cohort_id: 1
          },
          {
            name: 'Ryan Thissen',
            email: 'rmt1855@gmail.com',
            size: 'Large',
            fulfilled: false,
            cohort_id: 1
          }
        ])
        })
      })
    })
};
