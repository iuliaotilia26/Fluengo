"use strict";
var express = require("express");
var path_1 = require("path");
var favicon = require("serve-favicon");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var body_parser_1 = require("body-parser");
var session = require('express-session');
var passport = require('passport');
var db_1 = require("./db");
var cards_1 = require("./routes/cards");
var teacher_1 = require("./routes/teacher");
var language_1 = require("./routes/language");
var location_1 = require("./routes/location");
var book_1 = require("./routes/book");
var bookStatus_1 = require("./routes/bookStatus");
var auth_1 = require("./routes/auth");
// Config the Passport service here
var passportConfig = require('./services/passport-service');
var profile_1 = require("./routes/profile");
var createTeacher_1 = require("./routes/createTeacher");
var bookingTeacher_1 = require("./routes/bookingTeacher");
var updateTeacher_1 = require("./routes/updateTeacher");
var upload_1 = require("./routes/upload");
var editStudent_1 = require("./routes/editStudent");
var uploadStudent_1 = require("./routes/uploadStudent");
passportConfig(passport);
var app = express();
exports.app = app;
app.disable("x-powered-by");
app.use(favicon(path_1.join(__dirname, "../src/assets/icon", "favicon.ico")));
app.use(express.static(path_1.join(__dirname, '../public')));
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// api routes
app.use("/api/card", cards_1.cardRouter);
app.use("/api/teacher", teacher_1.teacherRouter);
app.use("/api/language", language_1.languageRouter);
app.use("/api/location", location_1.locationRouter);
app.use("/api/book", book_1.bookRouter);
app.use("/api/booking", bookStatus_1.bookStatusRouter);
app.use("/api/auth", auth_1.authRouter);
app.use("/api/profile", profile_1.profileRouter);
app.use("/api/create", createTeacher_1.createTeacherRouter);
app.use("/api/update", updateTeacher_1.updateTeacherRouter);
app.use("/api/bookingPage", bookingTeacher_1.bookingTeacherRouter);
app.use("/api/editStudent", editStudent_1.editStudentRouter);
app.use("/api/upload", upload_1.uploadRouter);
app.use("/api/uploadStudent", uploadStudent_1.uploadRouterStudent);
app.get("/api/test", function (request, response) {
    db_1.knex.select().from('teacher').then(function (resp) {
        console.log(resp);
        response.header('Content-type', 'application/json');
        response.json(resp);
    });
});
app.use(express.static(path_1.join(__dirname, '../src/app')));
app.use('/assets', express.static(path_1.join(__dirname, '../src/assets')));
app.use('/public', express.static(path_1.join(__dirname, '../src/public')));
if (app.get("env") === "development") {
    var devMiddleware_1 = webpackDevMiddleware(webpack(require(path_1.join(__dirname, '../webpack.config.js'))), {
        stats: {
            colors: true
        }
    });
    app.use(devMiddleware_1);
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
    app.use(function (req, res, next) {
        req.url = '/';
        return devMiddleware_1(req, res, next);
    });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    res.json('file not found');
});
//# sourceMappingURL=app.js.map