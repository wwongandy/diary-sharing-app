const express = require('express');
const router = express.Router();

// Importing the different router management files.
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const diariesAPI = require('./routes/diaries-api');

// Main landing page router.
router.get('/', indexRouter);

// Diaries' RESTful API routing calls.
router.get('/diaries', diariesAPI.retrieveDiaries);
router.delete('/diaries/:id', diariesAPI.deleteDiary);
router.get('/diaries/public', diariesAPI.retrievePublicDiaries);
router.get('/diaries/:id', diariesAPI.retrieveDiary);
router.post('/diaries', diariesAPI.addDiary);
router.post('/diaries/:id', diariesAPI.addComment);
router.put('/diaries/:id/like', diariesAPI.likeDiary);
router.put('/diaries/:id/changePublicity', diariesAPI.changePublicity);

// Routes to manage RESTful user creation / authentication system.
router.get('/users', usersRouter.retrieveUsers);
router.post('/users', usersRouter.addUser);
router.post('/users/login', usersRouter.authenticateUser);
router.delete('/users/:id', usersRouter.deleteUser);

module.exports = router;