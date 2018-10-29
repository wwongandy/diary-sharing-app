let express = require('express');
let router = express.Router();

let bcrypt = require('bcryptjs');
let User = require('../models/users-db');
let Diary = require('../models/diaries-db');

/*
    RESTful API functions to allow creation and authentication of users;

    TODO:
    Add function to change password later.
 */

router.addUser = (request, response) => {
  // Adds a new user to the database.

  let newUser = new User();

  const { name, password } = request.body;

  if (String(request.body.name) != '') {

    // Only add a new user if the existing username isn't used.
    User.find({'name': name}, (err, users) => {

      if (err) {
        response.send(`Error found while checking if the given name already exists.\n${err}`);
      }

      if (users.length === 0) {

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

                  /*
                  response.send(
                      JSON.stringify(newUser, null, 4)
                  );
                  */
                  // Update current page.
                  response.render(
                      'signup',
                      {
                          success: 'yay',
                          user: newUser
                      }
                  )
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

  if (String(request.body.name) != '' && String(request.body.password) != '') {

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

              /*
              response.send(
                  JSON.stringify(user, null, 4)
              );
              */
              // Redirect to user landing page rather than sending user data.
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
    // Deleting a user and their associated diaries.

    Diary.deleteMany({'author': request.params.userId}, (err) => {

        if (err) {
            response.send(`Error found while trying to remove the diaries of the given user.\n${err}`);
        }

        User.findByIdAndRemove(request.params.userId, (err) => {

            if (err) {
                response.send(`Error found while trying to delete the user.\n${err}`);
            }

            response.redirect('/users');
        })
    })
}

router.retrieveUsers = (request, response) => {
    // Retrieve all usernames (for testing).

    /*
        Removing the password and id attributes when displaying the users.
        null is used initially to tell MongoDB not to use any query parameters.
     */
    User.find(null, '-_id -password', (err, users) => {

      if (err) {
        response.send(`Error found while trying to find the users.\n${err}`);
      }

      /*
      response.send(
          JSON.stringify(users, null, 4)
      );
      */

      response.render(
          'users',
          {
              users: users
          }
      );
    })
}

router.promptSignup = (request, response) => {
    // Renders the page to prompt users to sign up for a new account.

    response.render('signup', {title: 'Dairy Diaries'});
}

module.exports = router;
