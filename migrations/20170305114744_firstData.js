
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', (table) => {
  table.increments('id').primary()
  table.string('gnum').notNullable().defaultTo('');
  table.string('type').notNullable().defaultTo('');
  table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
  .then( function() {
  return knex.schema.createTable('students', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().defaultTo('');
    table.string('email').notNullable().defaultTo('');
    table.string('size').notNullable().defaultTo('');
    table.boolean('fulfilled').defaultTo(false)
    table.integer('cohort_id').unsigned();
    table.foreign('cohort_id').references('cohorts.id').onDelete('cascade');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
  })
};

exports.down = (knex, Promise) => {
 return knex.schema.dropTable('students')
 .then( function() {
 return knex.schema.dropTable('cohorts')
 })
};
