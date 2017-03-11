"use strict";
/**
 * Created by Iulia Mustea on 11/23/2016.
 */
var db_1 = require("../db");
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var WindowsStrategy = require('passport-windowslive').Strategy;
var facebookAuthConfig = require('config').get('facebookAuth');
var twitterAuthConfig = require('config').get('twitterAuth');
var googleAuthConfig = require('config').get('googleAuth');
var windowsAuthConfig = require('config').get('windowsAuth');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        db_1.knex.select().from('student')
            .where('id', id).then(function (data) {
            done(null, data[0]);
        }).catch(function (err) { return done(err); });
    });
    passport.use(new FacebookStrategy({
        clientID: facebookAuthConfig.clientID,
        clientSecret: facebookAuthConfig.clientSecret,
        callbackURL: facebookAuthConfig.callbackURL,
        profileFields: ['id', 'emails', 'name']
    }, function (token, refreshToken, profile, done) {
        db_1.knex.select().from('student')
            .where('facebook_id', profile.id).then(function (data) {
            if (data.length === 0) {
                db_1.knex.select().from('student')
                    .where('email', profile.emails[0].value)
                    .then(function (info) {
                    if (info.length == 0) {
                        db_1.knex('student').insert({
                            facebook_id: profile.id,
                            token: token,
                            name: profile.name.givenName + ' ' + profile.name.familyName,
                            email: profile.emails[0].value
                        }).then(function (newUser) {
                            return done(null, newUser);
                        });
                    }
                    else {
                        db_1.knex('student')
                            .where('email', profile.emails[0].value)
                            .update({
                            facebook_id: profile.id,
                            token: token
                        }).then(function (updatedUser) {
                            return done(null, updatedUser);
                        });
                    }
                });
            }
            else {
                // user found, send data
                return done(null, data[0]);
            }
        }).catch(function (err) { return done(err); });
    }));
    passport.use(new TwitterStrategy({
        consumerKey: twitterAuthConfig.consumerKey,
        consumerSecret: twitterAuthConfig.consumerSecret,
        callbackURL: twitterAuthConfig.callbackURL,
        includeEmail: twitterAuthConfig.includeEmail
    }, function (token, refreshToken, profile, done) {
        db_1.knex.select().from('student')
            .where('twitter_id', profile.id).then(function (data) {
            if (data.length === 0) {
                if (profile.emails[0].value !== null) {
                    db_1.knex.select().from('student')
                        .where('email', profile.emails[0].value)
                        .then(function (info) {
                        if (info.length == 0) {
                            db_1.knex('student').insert({
                                twitter_id: profile.id,
                                token_twitter: token,
                                name: profile.displayName,
                                // Not all Twitter users have an e-mail address (this will be a hassle)
                                email: profile.emails && profile.emails.length && profile.emails[0].value || null
                            }).then(function (newUser) {
                                return done(null, newUser);
                            });
                        }
                        else {
                            db_1.knex('student')
                                .where('email', profile.emails[0].value)
                                .update({
                                twitter_id: profile.id,
                                token_twitter: token
                            }).then(function (updatedUser) {
                                return done(null, updatedUser);
                            });
                        }
                    });
                }
                else {
                    db_1.knex('student').insert({
                        twitter_id: profile.id,
                        token_twitter: token,
                        name: profile.displayName,
                        // Not all Twitter users have an e-mail address (this will be a hassle)
                        email: profile.emails && profile.emails.length && profile.emails[0].value || null
                    }).then(function (newUser) {
                        return done(null, newUser);
                    });
                }
            }
            else {
                // user found, send data
                return done(null, data[0]);
            }
        }).catch(function (err) { return done(err); });
    }));
    passport.use(new GoogleStrategy({
        clientID: googleAuthConfig.clientID,
        clientSecret: googleAuthConfig.clientSecret,
        callbackURL: googleAuthConfig.callbackURL
    }, function (token, refreshToken, profile, done) {
        db_1.knex.select().from('student')
            .where('google_id', profile.id).then(function (data) {
            if (data.length === 0) {
                db_1.knex.select().from('student')
                    .where('email', profile.emails[0].value)
                    .then(function (info) {
                    if (info.length == 0) {
                        db_1.knex('student').insert({
                            google_id: profile.id,
                            google_token: token,
                            name: profile.displayName,
                            email: profile.emails[0].value
                        }).then(function (newUser) {
                            return done(null, newUser);
                        });
                    }
                    else {
                        db_1.knex('student')
                            .where('email', profile.emails[0].value)
                            .update({
                            google_id: profile.id,
                            google_token: token
                        }).then(function (updatedUser) {
                            return done(null, updatedUser);
                        });
                    }
                });
            }
            else {
                return done(null, data[0]);
            }
        }).catch(function (err) { return done(err); });
    }));
    passport.use(new WindowsStrategy({
        clientID: windowsAuthConfig.clientID,
        clientSecret: windowsAuthConfig.clientSecret,
        callbackURL: windowsAuthConfig.callbackURL,
        includeEmail: windowsAuthConfig.includeEmail
    }, function (token, refreshToken, profile, done) {
        db_1.knex.select().from('student')
            .where('windows_id', profile.id).then(function (data) {
            if (data.length === 0) {
                db_1.knex.select().from('student')
                    .where('email', profile.emails[0].value)
                    .then(function (info) {
                    if (info.length == 0) {
                        db_1.knex('student').insert({
                            windows_id: profile.id,
                            windows_token: token,
                            name: profile.displayName,
                            email: profile.emails[0].value
                        }).then(function (newUser) {
                            return done(null, newUser);
                        });
                    }
                    else {
                        db_1.knex('student')
                            .where('email', profile.emails[0].value)
                            .update({
                            windows_id: profile.id,
                            windows_token: token
                        }).then(function (updatedUser) {
                            return done(null, updatedUser);
                        });
                    }
                });
            }
            else {
                return done(null, data[0]);
            }
        }).catch(function (err) { return done(err); });
    }));
};
//# sourceMappingURL=passport-service.js.map