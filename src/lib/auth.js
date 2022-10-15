var express = require('express')
var app = express()
var jwt = require('jsonwebtoken')
var config = require('./config')
app.set('superSecret', config.secret)

exports.authappuser = function (req, res) {
    'use strict'
    if (!req.body.APP_NAME || !req.body.PASSWORD) {
        res.json({ success: false, message: 'please provide app name and password' })
        return;
    }

    if (req.body.APP_NAME != config.app_user && req.body.PASSWORD != config.password) {
        res.set('Content-Type', 'application/json');
        var status = 500;
        res.status(status).send(JSON.stringify({
            status: status,
            message: 'invalid credentials'
        }));
    } else {
        const payload = {
            admin: true
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 1000
        });

        res.json({
            success: true,
            token: token
        });
    }
};

exports.validateappuser = function (req, res, next) {
    //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    // decode token
    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' })
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};









