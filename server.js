const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = process.env.PORT || 8000;
const ROUTES = require('routes');

APP.use(ROUTES);

APP.listen(PORT, () => {
  console.log('Listening on port', PORT)
});
