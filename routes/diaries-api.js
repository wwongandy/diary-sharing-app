let express = require('express');
let router = express.Router();

let Diary = require('../models/diaries-db');

/*
    Connecting to the local MongoDB server.
    Uses Mongoose to establish connections with MongoDB.

    TODO:
    This will be setup to use an actual mLab MongoDB later.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/diariesdb');

let db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Error found, unable to connect to ${db.name}.\n${err}`);
})

db.once('open', () => {
    console.log(`Success, connected to ${db.name}.`);
})

// RESTful API functions to interact with the database;

router.retrieveDiaries = (request, response) => {
    // Retrieves all diaries from the database regardless of publicity.

    Diary.find((err, diaries) => {

        if (err) {
            response.send(`Error found while trying to access all the diaries.\n${err}`);
        }

        response.send(

            // Stringify function makes the JSON format more readable/indented.
            JSON.stringify(diaries, null, 4)
        );
    })
}

router.retrieveDiary = (request, response) => {
    // Retrieves a single diary from the database via id given.

    Diary.findById(request.params.id, (err, diary) => {

        if (err) {
            response.send(`Error found while trying to find the following diary.\n${err}`);
        }

        response.send(
            JSON.stringify(diary, null, 4)
        );
    })
}

router.retrievePublicDiaries = (request, response) => {
    // Retrieves all public diaries from the database.

    Diary.find({'sharing': true}, (err, diaries) => {

        if (err) {
            response.send(`Error found while trying to find public diaries.\n${err}`);
        }

        response.send(
            JSON.stringify(diaries, null, 4)
        );
    })
}

router.addDiary = (request, response) => {
    // Adds a new diary to the database.

    let newDiary = new Diary();

    /*
        Quickly assigning request.body elements to their appropriate attributes.
        e.g. request.body.author is stored in author and request.body.sharing in sharing.
     */
    const { title, text, author, sharing } = request.body;

    // Ignore the POST request if the text body is empty.
    if (request.body.text != undefined) {
        newDiary.title = title;
        newDiary.text = text;
        newDiary.author = author;
        newDiary.sharing = sharing;

        newDiary.save((err) => {

            if (err) {
                response.send(`Error found while creating the new diary.\n${err}`);
            }

            response.send(
                JSON.stringify(newDiary, null, 4)
            );
        })
    } else {
        response.send('Error found while creating the new diary.\nText field is empty.');
    }
}

router.addComment = (request, response) => {
    // Adds a comment to an existing diary from the database.

    // Ignore the POST request if the comment is empty.
    if (request.body.comment !== '') {

        Diary.findById(request.params.id, (err, diary) => {

            if (err) {
                response.send(`Error found while trying to find the following diary.\n${err}`);
            }

            diary.comments.push(request.body.comment);

            diary.save((err) => {

                if (err) {
                    response.send(`Error found while trying to add the comment to the diary.\n${err}`);
                }

                response.send(
                    JSON.stringify(diary, null, 4)
                );
            })
        })
    }
}

router.likeDiary = (request, response) => {
    // Updates the diary's like count, simple PUT operation.

    Diary.findById(request.params.id, (err, diary) => {

        if (err) {
            response.send(`Error found while trying to find the following diary.\n${err}`);
        }

        diary.likes += 1;

        diary.save((err) => {

            if (err) {
                response.send(`Error found while updating the like count.\n${err}`);
            }

            response.send(
                JSON.stringify(diary, null, 4)
            );
        })
    })
}

router.deleteDiary = (request, response) => {
    // Deletes a diary from the database.

    Diary.findByIdAndRemove(request.params.id, (err) => {

        if (err) {
            response.send(`Error found while trying to delete the diary.\n${err}`);
        }

        response.send('Success, diary deleted.');
    })
}

router.changePublicity = (request, response) => {
    // Changes the publicity of a diary with the given id.

    Diary.findById(request.params.id, (err, diary) => {

        if (err) {
            response.send(`Error found while trying to find the following diary.\n${err}`);
        }

        // Inverting the boolean value of sharing.
        diary.sharing = !diary.sharing;

        diary.save((err) => {

            if (err) {
                response.send(`Error found while changing the publicity of the diary.\n${err}`);
            }

            response.send(
                JSON.stringify(diary, null, 4)
            );
        })
    })
}

module.exports = router;