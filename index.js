require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const { join } = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// init passport google strategy
require('./config/passport')(passport);

// session middlware
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static
app.use(express.static(join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})