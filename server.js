let express = require('express');
let app = express();
let mongoose = require('mongoose');
let { log } = console;
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({
  extended: !true
}));

mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    log('Connected to mongodb')
  })
  .catch(e => {
    log(`Error while connecting to mongodb caused cause of ${e}`);
  });

app.get('/', (req, res) => {
  res.send('Hello World');
});
let user = require('./routes/user.js');


app.use('/api/user', user);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  log(`Server is running on ${PORT}`);
})
