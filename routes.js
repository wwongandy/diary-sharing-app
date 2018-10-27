const express = require('express');
const router = express.Router();

// Importing the different routing management files.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const diariesAPI = require('./routes/diaries-api');

// Pages that the user can interact with.
router.get('/', indexRouter);
router.get('/diaries', diariesAPI.retrievePublicDiaries);
router.get('/users', usersRouter.retrieveUsers);
router.get('/signup', usersRouter.promptSignup)
router.get('/user/:userId', diariesAPI.retrieveUserDiaries);

/*
    Diaries API related routes.

    Note that the some routes are commented out and replaced with a different initial URL name (e.g. /deletediary/:userId <== /diaries),
    they were replaced to allow the UI to interact with the routes, as DELETE/PUT methods are not supported.
 */
router.post('/search', diariesAPI.retrievePublicDiariesWithTitle) // Fuzzy search implementation.
router.get('/diaries/:diaryId', diariesAPI.retrieveDiary);
router.get('/deletediary/:userId/:diaryId', diariesAPI.deleteDiary);  // <== router.delete('/diaries/:id', diariesAPI.deleteDiary);
router.post('/diaries/:userId', diariesAPI.addDiary); // User Id is used to associate the added diary with a user.
router.post('/commentdiary/:diaryId', diariesAPI.addComment);
router.get('/likediary/:diaryId', diariesAPI.likeDiary);  // <== router.put('/diaries/:id/like', diariesAPI.likeDiary);
router.get('/sharediary/:diaryId', diariesAPI.changePublicity); // <== router.put('/diaries/:id/changePublicity', diariesAPI.changePublicity);

// User API related routes.
router.post('/users', usersRouter.addUser);
router.post('/users/login', usersRouter.authenticateUser);
router.delete('/users/:userId', usersRouter.deleteUser);

module.exports = router;