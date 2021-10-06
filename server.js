const express = require('express');
const path = require('path');

const app = express();

const PORT = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views/'));

app.use(express.static(path.join(__dirname, './static/')));

app.get('/', (request, response) => {
  response.render('pages/index', { pageTitle: 'Welcome!!!' });
});

app.get('/speakers', (request, response) => {
  response.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.listen(PORT, () => {
  console.log(`Express server listing at port : ${PORT}`);
});
