let express = require('express');
let router = express.Router();

let bcrypt = require('bcryptjs');
let User = require('../models/users-db');

// RESTful API functions to allow creation and authentication of users;

router.addUser = (request, response) => {
  // Adds a new user to the database.

  let newUser = new User();

  const { name, password } = request.body;

  if (request.body.name != undefined && request.body.password != undefined) {

    /*
      Hashing the password before saving it using bcrypt.js
      https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
     */
    bcrypt.hash(password, 10, (err, hash) => {

      if (err) {
        response.send(`Error found while hashing the password.\n${err}`);
      }

      newUser.name = name;
      newUser.password = password;

      newUser.save((err) => {

        if (err) {
          response.send(`Error found while creating a new user.\n${err}`);
        }

        response.send(
            JSON.stringify(newUser, null, 4)
        );
      })
    })
  } else {
    response.send('Error found while creating a new user.\nName or password field empty.');
  }
}

router.authenticateUser = (request, response) => {
  // Checks the user/password fields for any matching existing user from the database.

  const { name, password } = request.body;

  if (request.body.name != undefined && request.body.password != undefined) {

    User.find({'name': name}, (err, users) => {

      if (err) {
        response.send(`Error found while trying to find all the users with the following name.\n${err}`);
      }

      // For every user, compare their hash with the password given.
      users.forEach((user) => {

        bcrypt.compare(password, user.password, (err, result) => {

          if (err) {
            response.send(`Error found while authenticating the user.\n${err}`)
          } else if (result) { // Result = true if match.

            // TODO: Redirect to user landing page rather than sending user data.
            response.send(
                JSON.stringify(user, null, 4)
            );
          }
        })
      })

      // Finished looking through the database for matching user/passwords.
      response.send('Error found.\nIncorrect user or password.');
    })
  } else {
    response.send(`Error found while authenticating user.\nName or password field empty.`);
  }
}

router.deleteUser = (request, response) => {
  // Deleting a user (for testing).

    User.findByIdAndRemove(request.params.id, (err) => {

      if (err) {
        response.send(`Error found while trying to delete the user.\n${err}`);
      }

      response.send('Success, user deleted.');
    })
}

module.exports = router;
