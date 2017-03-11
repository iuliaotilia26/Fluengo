"use strict";
var express_1 = require("express");
var passport = require('passport');
var authRouter = express_1.Router();
exports.authRouter = authRouter;
authRouter.get('/facebook', function (req, res, next) {
    req.session.returnUrl = req.query.returnUrl || req.header('referer');
    next();
}, passport.authenticate('facebook', { scope: 'email' }));
authRouter.get('/facebook/callback', function (req, res, next) {
    var returnUrl = req.session.returnUrl || '/';
    req.session.returnUrl = undefined;
    return passport.authenticate('facebook', {
        successRedirect: returnUrl,
        failureRedirect: '/'
    })(req, res, next);
});
authRouter.get('/twitter', function (req, res, next) {
    req.session.returnUrl = req.query.returnUrl || req.header('referer');
    next();
}, passport.authenticate('twitter'));
authRouter.get('/twitter/callback', function (req, res, next) {
    var returnUrl = req.session.returnUrl || '/';
    req.session.returnUrl = undefined;
    return passport.authenticate('twitter', {
        successRedirect: returnUrl,
        failureRedirect: '/'
    })(req, res, next);
});
authRouter.get('/google', function (req, res, next) {
    req.session.returnUrl = req.query.returnUrl || req.header('referer');
    next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', function (req, res, next) {
    var returnUrl = req.session.returnUrl || '/';
    req.session.returnUrl = undefined;
    return passport.authenticate('google', {
        successRedirect: returnUrl,
        failureRedirect: '/'
    })(req, res, next);
});
authRouter.get('/windowslive', function (req, res, next) {
    req.session.returnUrl = req.query.returnUrl || req.header('referer');
    next();
}, passport.authenticate('windowslive', { scope: ['wl.basic', 'wl.emails'] }));
authRouter.get('/windowslive/callback', function (req, res, next) {
    var returnUrl = req.session.returnUrl || '/';
    req.session.returnUrl = undefined;
    return passport.authenticate('windowslive', {
        successRedirect: returnUrl,
        failureRedirect: '/'
    })(req, res, next);
});
authRouter.get("/", function (request, response) {
    console.log(request.user);
    if (!request.user) {
        return response.json(null);
    }
    response.json({
        id: request.user.id,
        name: request.user.name,
        email: request.user.email,
        teacher_id: request.user.teacher_id
    });
});
//# sourceMappingURL=auth.js.map