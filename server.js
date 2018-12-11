'use strict';

//app dependencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');

require('dotenv').config();

//app setup
const app = express();
const PORT = process.env.PORT || 3000;

//app middleware
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

//database setup
const client = new Client(process.env.DATABASE_URL);

client.connect();
client.on('error', err => console.error(err));

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
    queryType: req.body.title === 'on' ? intitle : inauthor,
  }
}

//book constructor function
function Book(query, data) {
  this.search_query = query;
  this.title = data.volumeInfo.title;
  this.author = data.volumeInfo.authors;
  this.description = data.volumeInfo.description;
  this.image = data.imageLinks.thumbnail;
}

let book = new Book(query.data.body.items);

//proxy request to Google Books API
const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
return superagent.get(url)

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});