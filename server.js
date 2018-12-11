'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
  res.render('../views/pages/index');
});

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});