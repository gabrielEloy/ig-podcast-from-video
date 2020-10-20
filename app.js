const express = require('express');
const routes = require('./src/router')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


app.use('/', routes)

app.listen(3000);