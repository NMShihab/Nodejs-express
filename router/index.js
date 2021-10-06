const express = require('express');
const speakerRouter = require('./speakers');
const feedbackRouter = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }

    // request.session.visitcount += 1;
    // console.log(`Number of visit is ${request.session.visitcount}`);

    response.render('layout', { pageTitle: 'Welcome!!!', template: 'index' });
  });

  router.use('/speakers', speakerRouter(params));
  router.use('/feedback', feedbackRouter(params));

  return router;
};
