var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var teamMembersRouter = require('./routes/teamMembers');
var notesRouter = require('./routes/notes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var cors = require('cors');
app.use(cors());

app.use('/', indexRouter);
app.use('/team-members', teamMembersRouter);
app.use('/notes', notesRouter);

module.exports = app;

