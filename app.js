const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require("method-override");

const {
  sequelize: db,
  User,
  Project
} = require('./db.js');

db.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log('error: ', err));

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

app.get('/', (req, res) => res.render('index'));

// setup =========================================================
// Users =========================================================

app.get('/users', (req, res) => { // Read index
  User.findAll()
    .then(users => res.render('users', { users }))
    .catch(err => console.log('error ============', err));
});

app.post('/user', (req, res) => { // Create
  console.log('====== looks like we hit the create route');
  User.create(req.body)
    .then(user => res.render('user', { user }))
    .catch(err => console.log(err));
});

app.get('/user/:id', (req, res) => { // Read show
  console.log('====== looks like we hit the show route');
  
  User.findByPk(req.params.id)
    .then(user => res.render('user', { user }))
    .catch(err => console.log('error ============', err));
});

app.post('/user/:id/edit', (req, res) => { // Update
  User.findByPk(req.params.id)
    .then(user => {
      user.update(req.body);
      res.redirect('/user/' + req.params.id);
    })
    .catch(err => console.log(err));
});

app.delete('/user/:id', (req, res) => { // Delete
  console.log('============= we are on the delete route');
  
  User.findByPk(req.params.id)
    .then(user => { 
      user.destroy()
        .then(result => {
          console.log('res from destroy ==================');
          console.log(result);
          res.redirect('/users');
        })
        .catch(err => console.log('========== err from destroy: ', err));
    });
}); 

app.listen(3000, console.log(3000));