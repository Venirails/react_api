var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var knex = require('./db/dbconfig')
var cors = require('cors')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// app.use(cors());
app.use(cors());

app.get('/', (req, res) => {
  console.log("app started!!");
  knex('todo_table').select('id', 'name').then(rows => {
    res.json(rows)
  })
})

app.post('/todo', (req, res) => {
  console.log("reqBody ::: ", req.body.name)
  knex('todo_table').insert({ name: req.body.name }).returning(['id', 'name'])
    .then(row => {
      res.json(row[0]);
    }).catch((err) => {
      console.log("err :::::::::::::::", err);
    })
})

app.delete('/todo/:id',(req,res) => {
  console.log("id ::::::::::::::::::::::::::::",req.params.id);
  knex('todo_table').where('id',req.params.id).del(['id','name']).then(row => {
    console.log("row is ::::::::::::::::::",row[0])
    res.json(row[0]);
  }).catch((err)=> { 
    console.log("err in deleteting!!!!!")
  })
  console.log("delete succcessfull")
})

app.put('/todo/:id',(req,res) => {
  console.log("id in put is :::::::::",req.params.id);
  knex('todo_table').where({id:req.params.id}).update({name:req.body.name},['id','name']).then(row => {
     console.log("res of put ::::::::::",row);
     res.json(row[0])
  })
})
module.exports = app;
