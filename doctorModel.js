const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Doctor = new Schema({
    fullname: {
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
    specialty: {
        type: String
    },
    mode: {
        type: String
    }
}); 

Doctor.method('transform', function() {
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('Doctor', Doctor);