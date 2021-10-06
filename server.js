const express = require('express');
const path = require('path');
const routes = require('./router/index');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');
const cookieSession = require('cookie-session');

const feedbackService = new FeedbackService('./data/feedback.json');

const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const PORT = 5000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['jdshjsh', 'sjdhjkshkjhs'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/'));

app.use(express.static(path.join(__dirname, './static/')));

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.listen(PORT, () => {
  console.log(`Express server listing at port : ${PORT}`);
});
