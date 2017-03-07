module.exports = {

  development: {
      client: 'pg',
      connection: 'postgres://localhost/gHoodies',
      ssl: true
  },
  production: {
    client: 'postgresql',
    ssl: true
  }

};
