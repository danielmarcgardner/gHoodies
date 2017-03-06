module.exports = {

  development: {
      client: 'pg',
      connection: 'postgres://localhost/gHoodies'
  },
  production: {
    client: 'pg',
    connection: {
      host: 'see heroku',
      database: 'see heroku',
      user: 'see heroku',
      port: '5432',
      password: 'see heroku',
      uri: 'see heroku'
    }
  }

};
