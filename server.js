const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 8000;
const ROUTES = require('./controllers/routes/routes.js');
const ADMIN = require('./controllers/routes/admin.js')

APP.use(ROUTES);
APP.use(ADMIN)
APP.use(EXPRESS.static('./'));

APP.listen(PORT, () => {
  console.log('Listening on port', PORT)
});
