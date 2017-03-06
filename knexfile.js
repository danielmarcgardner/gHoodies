module.exports = {

  development: {
      client: 'pg',
      connection: 'postgres://localhost/gHoodies',
      ssl: true
  },
  production: {
    client: 'postgresql',
    connection: 'postgres://ypwpihbtcuyvtd:80e2e659fc1d27f875fab62868db2868b9eaa59b69564219f0c9dc4e100edabd@ec2-107-20-141-145.compute-1.amazonaws.com:5432/d78b6dusvq1slk',
    ssl: true
  }

};
