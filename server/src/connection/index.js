// DOT ENV CONFIG
require('dotenv').config();

const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 5000;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
