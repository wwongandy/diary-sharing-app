## diary_sharing
Public/private diary sharing website for Web App Development 2's first assignment.

This website was built using the WebStorm IDE via JavaScript, Node.js and Handlebars.js, with the user interface compiled together using the Semantic UI framework. The RESTful API is built on a MongoDB database.

## Running the Project Locally:
Note that this project requires Node.js to be installed onto your device beforehand.

1) Clone the project and unzip the downloaded file.

2) In the terminal, run *npm install* inside the project folder.

3) Create a file named *mlab-credentials.js* in the project folder (alongside app.js) containing the following contents;
```## diary_sharing
Public/private diary sharing website for Web App Development 2's first assignment.

This website was built using the WebStorm IDE via JavaScript, Node.js and Handlebars.js, with the user interface compiled together using the Semantic UI framework. The RESTful API is built on a MongoDB database.

## Running the Project Locally:
Note that this project requires Node.js to be installed onto your device beforehand.

1) Clone the project and unzip the downloaded file.

2) In the terminal, run *npm install* inside the project folder.

3) Create a file named *mlab-credentials.js* in the project folder (alongside app.js) containing the following contents;
```
// Must create a mlab account and database to get the following link;
module.exports = 'your-mlab-uri-link-to-database';
```

4) Back onto the terminal, run *npm start* to run the project. The project should now be viewable in localhost:3000.

### Testing:
To run the tests for the project, run *npm test* in the terminal on the project folder.

## RESTful API Routes:
#### GET:

- /diaries (Gets all public diaries)

- /users (Gets all users)

- /user/:userId (Gets all diaries belonging to a user with given ID)

- /diaries/:diaryId (Gets a specific diary with given ID)

- /deletediary/:userId/:diaryId (Deletes a diary relating to a user with the given corresponding IDs)

- /likediary/:diaryId (Likes a diary with the given ID)

- /sharediary/:userId/:diaryId (Changes a diary's publicity with the given diary and user IDs)

#### POST:

- /search (Looks for any public diaries with the given string in the title)
```
{title: ''}
```

- /diaries/:userId (Adds a new diary with the author set as the given user ID)
```
{title: '', text: ''}
```

- /commentdiary/:diaryId (Comment on a diary with the given ID)
```
{comment: ''}
```

- /users (Adds a new user)
```
{name: '', password: ''}
```

- /users/login (Authenticates a user and redirects them to their landing page)
```
{name: '', password: ''}
```

#### DELETE:

- /users/:userId (Deletes a user with the given ID)

## Other:
[Hosted on Glitch](https://andyandya-diary-sharing.glitch.me/)

[Style Guide](https://github.com/airbnb/javascript)

// Must create a mlab account and database to get the following link;
module.exports = 'your-mlab-uri-link-to-database';
```

4) Back onto the terminal, run *npm start* to run the project. The project should now be viewable in localhost:3000.

### Testing:
To run the tests for the project, run *npm test* in the terminal on the project folder.

## RESTful API Routes:
#### GET:

- /diaries (Gets all public diaries)

- /users (Gets all users)

- /user/:userId (Gets all diaries belonging to a user with given ID)

- /diaries/:diaryId (Gets a specific diary with given ID)

#### POST:

- /search (Looks for any public diaries with the given string in the title)
```
{title: ''}
```

- /diaries/:userId (Adds a new diary with the author set as the given user ID)
```
{title: '', text: ''}
```

- /commentdiary/:diaryId (Comment on a diary with the given ID)
```
{comment: ''}
```

- /users (Adds a new user)
```
{name: '', password: ''}
```

- /users/login (Authenticates a user and redirects them to their landing page)
```
{name: '', password: ''}
```

## Other:
- [Glitch Hosted Page](https://andyandya-diary-sharing.glitch.me/)

- [Style Guide](https://github.com/airbnb/javascript)
