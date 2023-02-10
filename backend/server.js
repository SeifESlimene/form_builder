const express = require('express');

const app = express();

const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

app.get('/', (req, res) => {
  res.json({ message: 'Welcome To Our Pet Shop!' });
});

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected!'));

app.use(express.json());

const indexRoutes = require('./api/index.js');

app.use('/api', indexRoutes);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log('Successfully Connected To Server');
});
