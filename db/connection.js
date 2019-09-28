const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL)
  .then(() => {
      console.log('SUCCESS: Connection Established');
  })
  .catch((error) => {
      console.log('ERROR: Could not connect to mongodb Database');
  })

console.log(process.env.DB_URL);

module.exports = mongoose;
