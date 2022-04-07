const express = require('express');
const router = express.Router();
const User = require('../models/User');
const connectToDb = require('../db');
const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-west-1_vnOJhD0LO",
    tokenUse: "access",
    clientId: "7pa5i9s1hl78b4vdrlnd9j571o",
  });

router.post('/loadUserData', async (req, res) => {
    await connectToDb();

    try {
        const auth = req.headers.authorization
        const payload = await verifier.verify(auth.split(" ")[1])
        console.log(payload)
        const data = await User.findById(payload.sub);

        if (data === null) res.status(500).send({ error: `User data for ${payload.sub} not found` });
        else res.status(200).send({ userID: data._id, userData: data.userData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/saveUserData', async (req, res) => {
    await connectToDb();

    try {
        const auth = req.headers.authorization
        const payload = await verifier.verify(auth.split(" ")[1])
        
        const userID = payload.sub;
        const userData = req.body.userData;

        await User.findByIdAndUpdate(userID, { $set: { _id: userID, userData: userData } }, { upsert: true });
        res.status(200).send();
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;
