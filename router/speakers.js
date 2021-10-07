const express = require('express');

const speakerRouter = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  speakerRouter.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    // response.render('pages/speakers', { pageTitle: 'Speakers' });
    const allData = await speakerService.getData();

    const allImageArray = allData.map((speaker) => speaker.artwork);
    const allImage = allImageArray.flat();

    response.render('layout', { pageTitle: 'Speaker', template: 'speakers', speakers, allImage });
  });

  speakerRouter.get('/:shortname', async (request, response) => {
    // response.render('pages/speakers', { pageTitle: 'Speakers' });
    const speaker = await speakerService.getSpeaker(request.params.shortname);
    const artworks = await speakerService.getSpeakerArt(request.params.shortname);

    response.render('layout', {
      pageTitle: 'request.params.shortname',
      template: 'speaker-detail',
      speaker,
      artworks,
    });
  });

  return speakerRouter;
};
