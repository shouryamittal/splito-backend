require('./config/config');
require('./db/connection');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const user = require('./routes/user');
const board = require('./routes/board');
const expenses = require('./routes/expenses');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(user);
app.use(board);
app.use(expenses);

app.listen(process.env.PORT, () => {
  console.log(`Server is runnig at : ${process.env.PORT}`);
});
