require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expressSession = require('express-session');
const passport = require('passport');
const { join } = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static(join(__dirname, 'public')));
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})