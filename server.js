'use strict';

//app dependencies
const express = require('express');
const superagent = require('superagent');
// const cors = require('cors');

require('dotenv').config();

//app setup
const app = express();
const PORT = process.env.PORT || 3000;

//app middleware
// app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

//database setup
// const client = new Client(process.env.DATABASE_URL);

// client.connect();
// // error handler
// client.on('error', err => console.error(err));

//set template
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('../views/pages/index');
});

app.post('/searches', getBook);

//helper function
function getBook(req, res) {
  const bookHandler = {
    query: req.body.search_query,
    queryType: req.body.title === 'on' ? 'intitle' : 'inauthor',
  };
  console.log(req.body.search_query);
  //grab API data if the database is empty
  Book.fetch(bookHandler, res);
}

//book constructor function
function Book(data) {
  this.search_query = data.query;
  this.title = data.volumeInfo.title;
  this.author = data.volumeInfo.authors;
  this.description = data.volumeInfo.description;
  if (data.volumeInfo.imageLinks)
  {
    this.image = data.volumeInfo.imageLinks.thumbnail;
  }
  else
  {
    this.img_url = 'https://via.placeholder.com/150';
  }
}

Book.fetch = function (bookHandler, res) {
  //fetch data from google books API
  const url = `https://www.googleapis.com/books/v1/volumes?q=${bookHandler.queryType}:${bookHandler.query}`;
  superagent.get(url)
    .then(results => {
      let bookArray = Book.createBooks(results.body.items);
      return bookArray;
    })
    .then (results => {
      res.render('./pages/searches/show', { allBooks: results});
    });
};

Book.createBooks = function (bookInfo) {
  //this makes an array of books that will be rendered on the page
  let allBooks = [];
  if (bookInfo.length < 1) {
    return allBooks;
  } else {
    if (bookInfo.length > 10) {
      bookInfo = bookInfo.slice [0,10];
    }
    allBooks = bookInfo.map (item => {
      let book = new Book (item);
      return book;
    });
    return allBooks;
  }
};

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});