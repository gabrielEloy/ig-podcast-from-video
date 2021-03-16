require('dotenv').config()

import express from 'express';
import routes from './src/router';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());


app.use('/', routes)

app.listen(3000);