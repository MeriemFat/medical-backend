const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Store = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    governorate: {
        type: String
    },
    phone: {
        type: String
    },
    facebook_link: {
        type: String
    },
    website: {
        type: String
    }
});

Store.method('transform', function() {
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});


module.exports = mongoose.model('Store', Store);