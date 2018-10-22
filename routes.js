const express = require('express');
const router = express.Router();

// Importing the different router management files.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const diariesAPI = require('./routes/diaries-api');

// Landing pages that the user interacts with.
router.get('/', indexRouter);
router.get('/user/:userId', diariesAPI.retrieveUserDiaries);

// Diaries' RESTful API routing calls.
router.get('/diaries', diariesAPI.retrieveDiaries);
router.post('/diaries/search', diariesAPI.retrievePublicDiariesWithTitle)
router.delete('/diaries/:id', diariesAPI.deleteDiary);
router.get('/diaries/public', diariesAPI.retrievePublicDiaries);
router.get('/diaries/:id', diariesAPI.retrieveDiary);
router.post('/diaries/:userId', diariesAPI.addDiary); // User Id is used to associate the added diary with a user.
router.post('/diaries/:id/comment', diariesAPI.addComment);
router.put('/diaries/:id/like', diariesAPI.likeDiary);
router.put('/diaries/:id/changePublicity', diariesAPI.changePublicity);

// Routes to manage RESTful user creation / authentication system.
router.get('/users', usersRouter.retrieveUsers);
router.post('/users', usersRouter.addUser);
router.post('/users/login', usersRouter.authenticateUser);
router.delete('/users/:id', usersRouter.deleteUser);

module.exports = router;