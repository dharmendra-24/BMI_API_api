const mongoose = require('mongoose');


let ClientSchemas = mongoose.Schema({


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

module.exports = ClientSchemas = mongoose.model('clients',ClientSchemas);