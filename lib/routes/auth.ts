import {Router, Request, Response, NextFunction} from "express";
import * as passport from 'passport';


const authRouter: Router = Router();

authRouter.get('/facebook', (req, res, next) => {
  req.session.returnUrl = req.query.returnUrl || req.header('referer');
  next();
}, passport.authenticate('facebook', {scope: 'email'}));


authRouter.get('/facebook/callback', (req, res, next) => {

  const returnUrl = req.session.returnUrl || '/';
  req.session.returnUrl = undefined;

  return passport.authenticate('facebook', {

    successRedirect: returnUrl,
    failureRedirect: '/'
  })(req, res, next);


});

authRouter.get('/twitter', (req, res, next) => {
  req.session.returnUrl = req.query.returnUrl || req.header('referer');
  next();
}, passport.authenticate('twitter'));


authRouter.get('/twitter/callback', (req, res, next) => {
  const returnUrl = req.session.returnUrl || '/';
  req.session.returnUrl = undefined;

  return passport.authenticate('twitter', {
    successRedirect: returnUrl,
    failureRedirect: '/'
  })(req, res, next);
});


authRouter.get('/google', (req, res, next) => {
  req.session.returnUrl = req.query.returnUrl || req.header('referer');
  next();
}, passport.authenticate('google', { scope: ['profile','email'] }));


authRouter.get('/google/callback', (req, res, next) => {
  const returnUrl = req.session.returnUrl || '/';
  req.session.returnUrl = undefined;

  return passport.authenticate('google', {
    successRedirect: returnUrl,
    failureRedirect: '/'
  })(req, res, next);
});


authRouter.get('/windowslive', (req, res, next) => {
  req.session.returnUrl = req.query.returnUrl || req.header('referer');
  next();
}, passport.authenticate('windowslive', { scope: [ 'wl.basic','wl.emails']  }));


authRouter.get('/windowslive/callback', (req, res, next) => {
  const returnUrl = req.session.returnUrl || '/';
  req.session.returnUrl = undefined;

  return passport.authenticate('windowslive', {
    successRedirect: returnUrl,
    failureRedirect: '/'
  })(req, res, next);
});


authRouter.get("/", (request: Request, response: Response) => {
  console.log(request.user);

  if (!request.user) {
    return response.json(null);
  }

  response.json({
    id: request.user.id,
    name: request.user.name,
    email: request.user.email,
    teacher_id:request.user.teacher_id
  });
});

export {authRouter};
