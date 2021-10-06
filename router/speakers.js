const express = require('express');

const speakerRouter = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  speakerRouter.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    // response.render('pages/speakers', { pageTitle: 'Speakers' });

    return response.json(speakers);
  });

  speakerRouter.get('/:shortname', (request, response) => {
    // response.render('pages/speakers', { pageTitle: 'Speakers' });

    response.send(`Speaker name is ${request.params.shortname} `);
  });

  return speakerRouter;
};
