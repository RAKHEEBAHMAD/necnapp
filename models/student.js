const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
   username:{
    type:String,
    required:true,
    
   },
   rollnumber:{
    type:String,
    required:true,
   },
   
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
   }
});

const user = mongoose.model('student',userschema);

module.exports = user;