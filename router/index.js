const express = require('express');
const speakerRouter = require('./speakers');
const feedbackRouter = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome!!!' });
  });

  router.use('/speakers', speakerRouter(params));
  router.use('/feedback', feedbackRouter(params));

  return router;
};
