let express = require('express');
let router = express.Router();

let bcrypt = require('bcryptjs');
let User = require('../models/users-db');
let Diary = require('./diaries-api');

/*
    RESTful API functions to allow creation and authentication of users;

    TODO:
    Add function to change password later.
 */

router.addUser = (request, response) => {
  // Adds a new user to the database.

  let newUser = new User();

  const { name, password } = request.body;

  if (request.body.name != undefined && request.body.password != undefined) {

    // Only add a new user if the existing username isn't used.
    User.find({'name': name}, (err, users) => {

      if (err) {
        response.send(`Error found while checking if the given name already exists.\n${err}`);
      }

      if (users.length == 0) {

          /*
            Hashing the password before saving it using bcrypt.js
            https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
          */
          bcrypt.hash(password, 10, (err, hash) => {

              if (err) {
                  response.send(`Error found while hashing the password.\n${err}`);
              }

              newUser.name = name;
              newUser.password = hash;

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
        response.send('Error found while creating a new user.\nName already used.');
      }
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
            response.send(`Error found while authenticating the user.\n${err}`);
          } else if (result) { // Result = true if match.

              // Redirect to user landing page rather than sending user data.
              /*
              response.send(
                  JSON.stringify(user, null, 4)
              );
              */
              response.redirect('/user/' + user.id);
          }
        })
      });
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

router.retrieveUsers = (request, response) => {
    // Retrieve all usernames (for testing).

    /*
        Removing the password and id attributes when displaying the users.
        null is used initially to tell MongoDB not to use any queries.
     */
    User.find(null, '-password -_id', (err, users) => {

      if (err) {
        response.send(`Error found while trying to find the users.\n${err}`);
      }

      response.send(
          JSON.stringify(users, null, 4)
      );
    })
}

module.exports = router;
