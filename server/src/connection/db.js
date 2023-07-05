require('dotenv').config();
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

const connect = () => {
  return mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=> {
console.log('MongoDB Connected')
})

.catch((e) =>{
    console.log(e)
});
};

module.exports = { connect };
