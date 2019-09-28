const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema ({

    email: {
      type: String,
      required:  true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },

    tokens:[{
      auth: {
        type: String,
        default: "auth"
      },
      token: String
    }]
});

const User = mongoose.model('Users', userSchema);
userSchema.pre('save', () => {
    //create a hash of user password.
})
module.exports = User;
