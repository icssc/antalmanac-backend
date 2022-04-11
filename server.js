const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const DynamoDBStore = require('dynamodb-store');

require('dotenv').config();

const setup = (corsEnabled) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // cookie: { maxAge: 1000 * 60 * 60 * 24 },
        store: new DynamoDBStore({
            'table': {
                'name': process.env.SESSION_DDB_NAME,
                'ttl': 1000 * 60 * 60 * 24
            }
        })
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
        app.use(
            cors({
                origin: [
                    'https://dev.antalmanac.com',
                    'https://www.dev.antalmanac.com',
                    'http://localhost:3000'
                ],
                credentials: true
            })
        );
    }

    app.use('/api', routes);
    return app;
}

module.exports = setup
