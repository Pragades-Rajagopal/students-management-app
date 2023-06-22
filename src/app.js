const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const HOSTNAME = 'localhost';
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'))

app.get('/check', (request, response) => {
    response.send('Server is up and running');
});

app.get('/home', (request, response) => {
    response.render('index')
});

app.listen(PORT, () => {
    console.log(`Server is running > http://${HOSTNAME}:${PORT}/`);
})

