const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const DonorSchema = new Schema({
    id : Schema.Types.ObjectId,
    name : {type : String},
    phone :  {type : Number},
    bloodGroup : {type : String},
    city: {type : String},
    message : {type : String},
    lat : {type : Number},
    lng : {type : Number},
    date : {type : Date}

});


module.exports =  mongoose.model('Donor',DonorSchema)