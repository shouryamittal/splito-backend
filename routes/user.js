const router = require('express').Router();
const User = require('../models/user');


router.get('/', (req, res) => {
  res.status(200).send('OK');
});

router.post('/user/signup', (req, res) => {
  let user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
  })

//SAVE NEW USER DETAILS
  user.save()
    .then((response) => {
        if(!response){
          res.send(`User details could not be saved Succesfully.`);
        }
        res.status(200).send(`User Deatils Saved Successfully !!`);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
})

module.exports = router;
