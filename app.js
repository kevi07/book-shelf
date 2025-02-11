const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Book = require('./models/db');

const app = express();
const port = process.env.PORT || 5000;

const dbURI = 'mongodb+srv://kevin:FBMxSrVjq3C64BHO@cluster0.hdn3h0e.mongodb.net/bookshelf?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/main'));

app.get('/create', (req, res) => res.render('create'));

app.post('/create', (req, res) => {
    const book = new Book(req.body);
    book.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
});

app.get('/about', (req, res) => res.render('about'));

app.get('/main', (req, res) => {
    Book.find()
        .then(books => res.render('index', { books }))
        .catch(err => console.log(err));
});

app.delete('/main/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json({ redirect: '/' }))
        .catch(err => console.log(err));
});

app.listen(port);
