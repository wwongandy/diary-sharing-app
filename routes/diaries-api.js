let express = require('express');
let router = express.Router();

let Diary = require('../models/diaries-db');

// RESTful API functions to interact with the database;

router.retrieveDiaries = (request, response) => {
    // Retrieves all diaries from the database regardless of publicity.

    /*
        The first argument is null to indicate to the query that the search is intended to
        find every diary in the database.

        The second argument tells the function to not return the id/author data into the
        JSON output. This is done for security.
     */
    Diary.find(null, '-_id -author', (err, diaries) => {

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

    Diary.findById(request.params.diaryId, '-_id -author', (err, diary) => {

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

    Diary.find({'sharing': true}, '-author', (err, diaries) => {

        if (err) {
            response.send(`Error found while trying to find public diaries.\n${err}`);
        }

        /*
        response.send(
            JSON.stringify(diaries, null, 4)
        );
        */
        response.render(
            'diaries',
            {
                type: 'Public',
                diaries: diaries
            }
        )
    })
}

router.addDiary = (request, response) => {
    // Adds a new diary to the database.

    let newDiary = new Diary();

    /*
        Quickly assigning request.body elements to their appropriate attributes.
        e.g. request.body.author is now stored in author.
     */
    const { title, text, author } = request.body;

    // Ignore the POST request if the text body is empty.
    if (String(request.body.text) != '') {
        newDiary.title = title;
        newDiary.text = text;
        newDiary.author = request.params.userId;
        newDiary.sharing = true;

        newDiary.save((err) => {

            if (err) {
                response.send(`Error found while creating the new diary.\n${err}`);
            }

            /*
            response.send(
                JSON.stringify(newDiary, null, 4)
            );
            */

            // Redirecting user back to their main home page.
            response.redirect('/user/' + request.params.userId);
        })
    } else {
        response.send('Error found while creating the new diary.\nText field is empty.');
    }
}

router.addComment = (request, response) => {
    // Adds a comment to an existing diary from the database.

    // Ignore the POST request if the comment is empty.
    if (String(request.body.comment) !== '') {

        Diary.findById(request.params.diaryId, (err, diary) => {

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
    // Updates a diary's like count, simple PUT operation.

    Diary.findById(request.params.diaryId, (err, diary) => {

        if (err) {
            response.send(`Error found while trying to find the following diary.\n${err}`);
        }

        diary.likes += 1;

        diary.save((err) => {

            if (err) {
                response.send(`Error found while updating the like count.\n${err}`);
            }

            /*
            response.send(
                JSON.stringify(diary, null, 4)
            );
            */
            response.redirect('/diaries');
        })
    })
}

router.deleteDiary = (request, response) => {
    // Deletes a diary from the database.

    Diary.findByIdAndRemove(request.params.diaryId, (err) => {

        if (err) {
            response.send(`Error found while trying to delete the diary.\n${err}`);
        }

        // response.send('Success, diary deleted.');
        response.redirect('/user/' + request.params.userId);
    })
}

router.changePublicity = (request, response) => {
    // Changes the publicity of a diary with the given id.

    Diary.findById(request.params.diaryId, (err, diary) => {

        if (err) {
            response.send(`Error found while trying to find the following diary.\n${err}`);
        }

        // Inverting the boolean value of sharing. So true ==> false, false ==> true.
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

router.retrieveUserDiaries = (request, response) => {
    // Retrieves all diaries of a particular user.

    Diary.find({'author': request.params.userId}, (err, diaries) => {

        if (err) {
            response.send(`Error found while trying to access the diaries of the given user.\n${err}`);
        }

        response.render(
            'user',
            {
                userId: request.params.userId,
                diaries: diaries
            }
        );
    })
}

router.retrievePublicDiariesWithTitle = (request, response) => {
    // Retrieves all public diaries with a matching title.

    Diary.find({'sharing': true}, '-author', (err, diaries) => {

        if (err) {
            response.send(`Error found while trying to find public diaries.\n${err}`);
        }

        let matchingDiaries = [];

        // Add every diary that doesn't have a matching title to the new array.
        for (const key in diaries) {
            const diary = diaries[key];

            if (diary.title.includes(request.body.title || '')) {
                matchingDiaries.push(diary);
            }
        }

        /*
        response.send(
            JSON.stringify(matchingDiaries, null, 4)
        );
        */

        response.render(
            'diaries',
            {
                type: 'Found',
                diaries: matchingDiaries
            }
        )
    })
}

module.exports = router;