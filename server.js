const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 8000;
const ROUTES = require('./controllers/routes/routes.js');

APP.use(ROUTES);

APP.listen(PORT, () => {
  console.log('Listening on port', PORT)
});
