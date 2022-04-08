const express = require('express');
const passport = require('passport');
const connectToDb = require('../db');
const User = require('../models/User');

const router = express.Router();

/**
 * Get the user's session data
 */
router.get('/', function (req, res, next) {
    res.json(req.session);
});

/**
 * Initiate authentication with Google
 */
router.get('/google', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect(req.headers.referer ? req.headers.referer : '/');
        return;
    }
    req.session.returnTo = req.headers.referer ? req.headers.referer : '/';
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    })(req, res, next);
});

/**
 * Callback for Google authentication
 */
router.get('/google/callback', function (req, res) {
    passport.authenticate(
        'google',
        { failureRedirect: '/', session: true },
        // provides user information to determine whether or not to authenticate
        function (err, user, info) {
            console.log('Logging with Google!');
            if (err) console.log(err);
            else if (!user) console.log('Invalid login data');
            else {
                // manually login
                req.login(user, function (err) {
                    if (err) console.log(err);
                    else {
                        console.log('GOOGLE AUTHORIZED!');
                        // check if user is an admin
                    }
                });
                successLogin(req, res);
            }
        }
    )(req, res);
});

/**
 * Called after successful authentication
 * @param req Express Request Object
 * @param res Express Response Object
 */
function successLogin(req, res) {
    console.log('Logged in', req.user);
    // set the user cookie
    // redirect browser to the page they came from
    let returnTo = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(returnTo);
}

/**
 * Endpoint to logout
 */
router.get('/logout', function (req, res) {
    console.log('Logging out', req.user);
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('back');
    });
});

router.post('/loadUserData', async function (req, res) {
    await connectToDb();

    try {
        if (req.isAuthenticated()) {
            const userID = req.user.id;
            console.log(userID)
            const data = await User.findById(userID);
            
            if (data === null) res.status(500).send({ error: `User data for ${userID} not found` });
            else res.status(200).send({ userID: data._id, userData: data.userData });
        } else {
            res.status(500).json({ error: 'User not authenticated' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/saveUserData', async function (req, res) {
    await connectToDb();
    
    try {
        if (req.isAuthenticated()) {
            const userID = req.user.id;
            const userData = req.body.userData;
            
            console.log(userID)
            await User.findByIdAndUpdate(userID, { $set: { _id: userID, userData: userData } }, { upsert: true });
        }
        res.status(200).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
