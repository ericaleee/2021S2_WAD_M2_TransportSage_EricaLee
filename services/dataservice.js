var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var userModel;

mongoose.set('debug', true);

var database = {
    connect: function() {
            mongoose.connect('mongodb://127.0.0.1:27017/transportsageDB', function(err){
                if(err==null) {
                    console.log("Connected to Mongo DB");
                    //initialize values
                    userSchema = schema({
                        name: String,
                        email: String,
                        password: String,
                        phone: String
                    });
                    var connection = mongoose.connection;
                    userModel = connection.model('user', userSchema);
                } else {
                    console.log("Error connecting to Mongo DB");
                    console.log(err);
                }
            })
        },

        register: function(n, e, pw, p, callback) {
            var newUser = new userModel({
                name: n,
                email: e,
                password: pw,
                phone: p
            });
            newUser.save(callback);
        },

        


    };

    module.exports = database;