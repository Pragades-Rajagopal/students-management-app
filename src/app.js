const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/router')

const app = express();
const HOSTNAME = 'localhost';
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/app', router)

app.listen(PORT, () => {
    console.log(`Server is running > http://${HOSTNAME}:${PORT}/`);
})

