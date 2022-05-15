const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const DynamoDBStore = require('dynamodb-store');

require('dotenv').config();

const setup = (isProd = false) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    if (isProd) {
        app.use(
            cors({
                origin: [
                    'http://antalmanac.com',
                    'https://antalmanac.com',
                    'https://www.antalmanac.com',
                    'https://icssc-projects.github.io/AntAlmanac',
                ],
                credentials: true
            })
        );
        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 * 60 * 24},
            store: new DynamoDBStore({
                'table': {
                    'name': process.env.SESSION_DDB_NAME,
                    'ttl': 1000 * 60 * 60 * 24
                }
            })
        }));
    } else {
        app.use(
            cors({
                origin: [
                    /\.antalmanac\.com$/,
                    /^http:\/\/localhost:\d*/
                ],
                credentials: true
            })
        );
        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 * 60 * 24, sameSite: 'none', 'secure': true},
            store: new DynamoDBStore({
                'table': {
                    'name': process.env.SESSION_DDB_NAME,
                    'ttl': 1000 * 60 * 60 * 24
                }
            })
        }));
    }


    app.use(passport.initialize());
    app.use(passport.session());
    require('./config')
    app.use('/api', routes);
    return app;
}

module.exports = setup
