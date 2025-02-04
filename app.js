const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/db');

const app = express();
const port = process.env.PORT || 5000;


const dbURI = 'mongodb+srv://kevin:FBMxSrVjq3C64BHO@cluster0.hdn3h0e.mongodb.net/bookshelf?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI,{useNewUrlParser : true , useUnifiedTopology:true})
.then((result) => {
    console.log('connected');
})
.catch((err) => {
    console.log(err);
})
app.get('/',(req,res) => {
    res.redirect('/main')
})

app.use(express.urlencoded({ extended: true }))

app.get('/create',(req,res) => {
    res.render('create')
})

app.post('/create',(req,res) => {
    
    const book = new Book(req.body);

    book.save()
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/about',(req,res) => {
    res.render('about');
})

app.get('/main', (req, res) => {    
    Book.find()
        .then((books) => {
            res.render('index', { books }); 
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete('/main/:id',(req,res) => {
    const id=req.params.id;
    Book.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/' }); 
    })
    .catch(err => {
        console.log(err);
    })
});

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.listen(port);