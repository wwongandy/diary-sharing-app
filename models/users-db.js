let mongoose = require('mongoose');

let usersDOM = mongoose.Schema(
    {
        name: {type: String, default: ''},
        password: {type: String, default: ''}
    },
    {
        collection: 'usersdb'
    }
)

module.exports = mongoose.model('User', usersDOM);