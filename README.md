## diary_sharing
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

## Other:
- [Hosted on Glitch](https://andyandya-diary-sharing.glitch.me/)

- [Style Guide](https://github.com/airbnb/javascript)
