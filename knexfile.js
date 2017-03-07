module.exports = {

  development: {
      client: 'pg',
      connection: 'postgres://localhost/gHoodies',
      ssl: true
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    ssl: true
  }

};
