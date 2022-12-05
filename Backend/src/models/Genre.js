const {Schema, model} = require('mongoose');

const genreSchema = new Schema({
    label: {
        type: String,
        required: [true, 'Label field is required!']
    },
    value: {
        type: String,
        required: [true, 'Value field is required!']
    }
});

const Genre = model('genre', genreSchema);

module.exports = Genre;