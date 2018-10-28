# diary_sharing
Public/private diary sharing website for Web App Development 2's first assignment. This website was built using the WebStorm IDE via JavaScript, Node.js and Handlebars.js, with the user interface compiled together using the Semantic UI framework. The RESTful API is built on a MongoDB database.

## Running the Project:
Note that this project requires Node.js to run.

1) Clone the project and unzip the downloaded file.

2) In the terminal, run *npm install* inside the project folder to install the node modules required to run the project.

3) Create a file named *mlab-credentials.js* in the main folder (alongside app.js) following the format;
```
// Must create a mlab account and database to get the following link;
module.exports = 'mlab-uri-link-to-database';
```

4) Back onto the terminal, run *npm start* to run the project. The project should be viewable in localhost:3000.

## Running the Tests:
This project contains tests for the Model classes/objects only.

1) In the terminal, run *npm test* to run the tests.