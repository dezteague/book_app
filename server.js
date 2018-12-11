'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
// const cors = require('cors');
// app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

// app.get('/hello', (req, res) => {
//   res.render('../views/pages/index');
// });

app.get('/', (req, res) => {
  res.render('../views/pages/index');
});

app.post('/searches', (req,res) => {
  console.log('request body', req.body);
});

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});