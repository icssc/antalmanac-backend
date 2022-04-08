const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();

const setup = (corsEnabled) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
      }));
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config')

    if (corsEnabled) {
        app.use(
            cors({
                origin: [
                    'https://antalmanac.com',
                    'https://www.antalmanac.com',
                    'https://icssc-projects.github.io/AntAlmanac',
                ],
                credentials: true
            })
        );
    } else {
        app.use(cors());
    }

    app.use('/api', routes);
    return app;
}

module.exports = setup
