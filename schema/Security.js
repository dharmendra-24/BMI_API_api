const mongoose = require('mongoose');


let SecuritySchemas = mongoose.Schema({

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

module.exports = SecuritySchemas = mongoose.model('securities',SecuritySchemas);