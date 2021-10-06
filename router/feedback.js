const express = require('express');

const feedbackRouter = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  feedbackRouter.get('/', async (request, response) => {
    const feedbacks = await feedbackService.getList();
    // response.render('pages/feedback', { pageTitle: 'FeedBack' });
    return response.json(feedbacks);
  });

  return feedbackRouter;
};
