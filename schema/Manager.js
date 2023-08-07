const mongoose = require('mongoose');


let ManagerSchemas = mongoose.Schema({

    name : {
        type : String,
        required : false 
    },
    email : {
        type : String,
        required : false 
    },
    
    password : {
        type : String,
        required : false 
    },
    
    mobile : {
        type : String,
        required : false 
    }
});

module.exports = ManagerSchemas = mongoose.model('managers',ManagerSchemas);