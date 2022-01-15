const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username:String,
    phone:Number,
    email:String,
    password:String,
    password:String
}) ;

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users",UserSchema);

// var mongoose = require('mongoose');
// var passportLocalMongoose = require("passport-local-mongoose");
// var schema = mongoose.Schema;
// var UserSchema = {};
// var userModel;

// mongoose.set('debug', true);

// var database = {
//     connect: function() {
//             mongoose.connect('mongodb://127.0.0.1:27017/transportsageDB', function(err){
//                 if(err==null) {
//                     console.log("Connected to Mongo DB");
//                     //initialize values
//                     UserSchema = schema({
//                         username:String,
//                         phone:Number,
//                         email:String,
//                         password:String,
//                         password:String
//                     });
//                     var connection = mongoose.connection;
//                     userModel = connection.model('user', UserSchema);
//                 } else {
//                     console.log("Error connecting to Mongo DB");
//                     console.log(err);
//                 }
//             })
//         },

//         getUser: function(id, callback) {
//             userModel.findById(id,callback);
//         },
//         UserSchema.plugin(passportLocalMongoose);
//     };
//     module.exports = database;
