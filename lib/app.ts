import * as express from "express";
import {join} from "path";
import * as favicon from "serve-favicon";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpack from "webpack";
import {json, urlencoded} from "body-parser";
import * as session from 'express-session';
import * as passport from 'passport';

import {knex} from "./db";

import {cardRouter} from "./routes/cards";
import {teacherRouter} from "./routes/teacher";
import {languageRouter} from "./routes/language";
import {locationRouter} from "./routes/location";
import {bookRouter} from "./routes/book";
import {bookStatusRouter} from "./routes/bookStatus";
import {authRouter} from "./routes/auth";

// Config the Passport service here
import * as passportConfig from './services/passport-service';
import {profileRouter} from "./routes/profile";
import {createTeacherRouter} from "./routes/createTeacher";
import {bookingTeacherRouter} from "./routes/bookingTeacher";
import {updateTeacherRouter} from "./routes/updateTeacher";
import {uploadRouter} from "./routes/upload";
import {editStudentRouter} from "./routes/editStudent";
import {uploadRouterStudent} from "./routes/uploadStudent";
passportConfig(passport);

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../src/assets/icon", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({extended: true}));

// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// api routes
app.use("/api/card", cardRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/language", languageRouter);
app.use("/api/location", locationRouter);

app.use("/api/book", bookRouter);
app.use("/api/booking", bookStatusRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile",profileRouter);
app.use("/api/create",createTeacherRouter);
app.use("/api/update",updateTeacherRouter);
app.use("/api/bookingPage",bookingTeacherRouter);
app.use("/api/editStudent",editStudentRouter);

app.use("/api/upload",uploadRouter);
app.use("/api/uploadStudent",uploadRouterStudent);

app.get("/api/test", (request: Request, response: Response) => {

  knex.select().from('teacher').then(function (resp) {
    console.log(resp);
    response.header('Content-type', 'application/json');

    response.json(resp);
  });

});

app.use(express.static(join(__dirname, '../src/app')));
app.use('/assets', express.static(join(__dirname, '../src/assets')));
app.use('/public', express.static(join(__dirname, '../src/public')));

if (app.get("env") === "development") {
  const devMiddleware = webpackDevMiddleware(webpack(require(join(__dirname, '../webpack.config.js'))), {
    stats: {
      colors: true
    }
  });

  app.use(devMiddleware);

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({
      error: err,
      message: err.message
    });
  });

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.url = '/';
    return devMiddleware(req, res, next);
  });
}

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
  res.status(404);
  res.json('file not found');
});

export {app}
