let path = require('path');
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let { log } = console;
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({
  extended: !true
}));

app.use(require('cors')());
app.use(express.static(path.join(__dirname, 'front-end')));

mongoose.connect(
  `${process.env.DB}/${process.env.DB_NAME}`,
  { useUnifiedTopology: true, useNewUrlParser: true }
)
  .then(() => {
    log('Connected to mongodb')
  })
  .catch(e => {
    log(`Error while connecting to mongodb caused cause of ${e}`);
  });

let user = require('./routes/user.js');

app.use('/api/user', user);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  log(`Server is running on ${PORT}`);
})
