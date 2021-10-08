const express = require('express');
const { check, validationResult } = require('express-validator');

const feedbackRouter = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  feedbackRouter.get('/', async (request, response) => {
    const feedbacks = await feedbackService.getList();
    const errors = request.session.feedback ? request.session.feedback.errors : false;
    const success = request.session.feedback ? request.session.feedback.message : false;
    request.session.feedback = {};

    response.render('layout', {
      pageTitle: 'FeedBack',
      template: 'feedback',
      feedbacks,
      errors,
      success,
    });
  });

  feedbackRouter.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('Name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('Give us valid email'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('Title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('Please put a message'),
    ],
    async (request, response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };

        return response.redirect('/feedback');
      }

      const { name, email, title, message } = request.body;

      await feedbackService.addEntry(name, email, title, message);

      request.session.feedback = {
        message: 'Thank you for your feedback',
      };

      return response.redirect('/feedback');
    }
  );

  return feedbackRouter;
};
