let mongoose = require('mongoose');

let usersDOM = mongoose.Schema(
    {
        name: {type: String, default: ''},
        password: {type: String, default: ''},
        date: {type: Date, default: new Date()}
    },
    {
        collection: 'usersdb'
    }
)

module.exports = mongoose.model('User', usersDOM);