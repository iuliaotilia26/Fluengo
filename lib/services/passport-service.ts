/**
 * Created by Iulia Mustea on 11/23/2016.
 */
import {knex} from "../db";

const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const WindowsStrategy = require('passport-windowslive').Strategy;

const facebookAuthConfig = require('config').get('facebookAuth');
const twitterAuthConfig = require('config').get('twitterAuth');
const googleAuthConfig = require('config').get('googleAuth');
const windowsAuthConfig = require('config').get('windowsAuth');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {

    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {

    knex.select().from('student')
      .where('id', id).then((data) => {

      done(null, data[0])
    }).catch((err) => done(err));
  });

  passport.use(new FacebookStrategy({
      clientID: facebookAuthConfig.clientID,
      clientSecret: facebookAuthConfig.clientSecret,
      callbackURL: facebookAuthConfig.callbackURL,
      profileFields: ['id', 'emails', 'name']
    },

    (token, refreshToken, profile, done) => {
      knex.select().from('student')
        .where('facebook_id', profile.id).then((data) => {
        if (data.length === 0) {//thhere is no user with this facebook id


          knex.select().from('student')
            .where( 'email',profile.emails[0].value)
            .then((info) => {
              if(info.length==0)//created new user
              {

                knex('student').insert({
                  facebook_id: profile.id,
                  token: token,
                  name: profile.name.givenName + ' ' + profile.name.familyName,
                  email: profile.emails[0].value
                }).then((newUser) => {
                  return done(null, newUser)
                });
              }
              else {//update the user found with the email

                knex('student')
                  .where('email',profile.emails[0].value)
                  .update({
                    facebook_id: profile.id,
                    token:token

                  }).then((updatedUser) =>{
                      return done(null, updatedUser)});
              }
            })

        }
        else {
          // user found, send data
          return done(null, data[0]);
        }
      }).catch((err) => done(err));
    }));

   passport.use(new TwitterStrategy({
    consumerKey     : twitterAuthConfig.consumerKey,
    consumerSecret  : twitterAuthConfig.consumerSecret,
    callbackURL     : twitterAuthConfig.callbackURL,
    includeEmail    : twitterAuthConfig.includeEmail

     },
     (token, refreshToken, profile, done) => {
       knex.select().from('student')
         .where('twitter_id', profile.id).then((data) => {
         if (data.length === 0) {//didn't found a user with this twitter id

           if(profile.emails[0].value !== null)
           {
             knex.select().from('student')
               .where( 'email',profile.emails[0].value)
               .then((info) => {
                 if(info.length==0)//created new user
                 {

                   knex('student').insert({
                     twitter_id: profile.id,
                     token_twitter: token,
                     name: profile.displayName,
                     // Not all Twitter users have an e-mail address (this will be a hassle)
                     email: profile.emails && profile.emails.length && profile.emails[0].value || null
                   }).then((newUser) => {
                     return done(null, newUser)
                   });
                 }
                 else {//update the user found with the email

                   knex('student')
                     .where('email',profile.emails[0].value)
                     .update({
                       twitter_id: profile.id,
                       token_twitter:token

                     }).then((updatedUser) =>{
                     return done(null, updatedUser)});
                 }
               });
           }
           else {//the email is null too

             knex('student').insert({
               twitter_id: profile.id,
               token_twitter: token,
               name: profile.displayName,
               // Not all Twitter users have an e-mail address (this will be a hassle)
               email: profile.emails && profile.emails.length && profile.emails[0].value || null
             }).then((newUser) => {
               return done(null, newUser)
             });
           }

         }
         else {
           // user found, send data
           return done(null, data[0]);
         }
       }).catch((err) => done(err));
     }));


  passport.use(new GoogleStrategy({
      clientID: googleAuthConfig.clientID,
      clientSecret: googleAuthConfig.clientSecret,
      callbackURL: googleAuthConfig.callbackURL
    },

    (token, refreshToken, profile, done) => {

      knex.select().from('student')
        .where('google_id', profile.id).then((data) => {
        if (data.length === 0) {//there is no user with this google id

          knex.select().from('student')
            .where('email',profile.emails[0].value)
            .then((info) => {
              if(info.length==0)//created new user
              {

                knex('student').insert({
                  google_id: profile.id,
                  google_token: token,
                  name: profile.displayName,
                  email: profile.emails[0].value
                }).then((newUser) => {
                  return done(null, newUser)
                });
              }
              else {//update the user found with the email, update info

                knex('student')
                  .where('email',profile.emails[0].value)
                  .update({
                    google_id: profile.id,
                    google_token:token

                  }).then((updatedUser) =>{
                  return done(null, updatedUser)});
              }
            })

        }
        else {
          return done(null, data[0]);
        }
      }).catch((err) => done(err));
    }));


  passport.use(new WindowsStrategy({
      clientID: windowsAuthConfig.clientID,
      clientSecret: windowsAuthConfig.clientSecret,
      callbackURL: windowsAuthConfig.callbackURL,
      includeEmail: windowsAuthConfig.includeEmail
    },

    (token, refreshToken, profile, done) => {

      knex.select().from('student')
        .where('windows_id', profile.id).then((data) => {
        if (data.length === 0) {//there is no user with this google id

          knex.select().from('student')
            .where('email',profile.emails[0].value)
            .then((info) => {
              if(info.length==0)//created new user
              {

                knex('student').insert({
                  windows_id: profile.id,
                  windows_token: token,
                  name: profile.displayName,
                  email: profile.emails[0].value
                }).then((newUser) => {
                  return done(null, newUser)
                });
              }
              else {//update the user found with the email, update info

                knex('student')
                  .where('email',profile.emails[0].value)
                  .update({
                    windows_id: profile.id,
                    windows_token:token

                  }).then((updatedUser) =>{
                  return done(null, updatedUser)});
              }
            })

        }
        else {
          return done(null, data[0]);
        }
      }).catch((err) => done(err));
    }));



};
