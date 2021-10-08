const express = require('express');
const { check, validationResult } = require('express-validate');

const feedbackRouter = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  feedbackRouter.get('/', async (request, response) => {
    const feedbacks = await feedbackService.getList();
    const errors = request.session.feedback ? request.session.feedback.errors : false;
    request.session.feedback = {};
    console.log(feedbacks);

    response.render('layout', { pageTitle: 'FeedBack', template: 'feedback', feedbacks, errors });
  });

  feedbackRouter.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('Name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('Give us valid email'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('Title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('Please put a message'),
    ],
    (request, response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };

        return response.redirect('/feedback');
      }
      console.log(request.body);
      return response.send('Feedback posted');
    }
  );

  return feedbackRouter;
};
