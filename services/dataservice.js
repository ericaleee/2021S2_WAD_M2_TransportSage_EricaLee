var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var feedbackSchema = {};
var userModel, feedbackModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://127.0.0.1:27017/transportsageDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                userSchema = schema({
                    username: String,
                    phone: Number,
                    email: String,
                    password: String,
                    token: String     
                });

                feedbackSchema = schema({
                    username: String,
                    phone: Number,
                    email: String,
                    type: String,
                    feedback: String
                });
                var connection = mongoose.connection;
                userModel = connection.model('users', userSchema);
                feedbackModel = connection.model('feedbacks', feedbackSchema);
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addFeedback: function(n, p, e, t, f, callback) {
        var newFeedback = new feedbackModel({
            username: n,
            phone: p,
            email: e,
            type: t,
            feedback: f
        });
        newFeedback.save(callback);
    },
    addUser: function (un, pw, p, e, callback) {
        var newUser = new userModel({
            username: un,
            password: pw,
            phone: p,
            email: e,
        });
        newUser.save(callback);
    },

    getUser: function(id, token, callback){
        userModel.findById(id, {token:token}, callback);
    },
    login: function (u, p, callback) {
        userModel.findOne({ username: u, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function(token,callback) {
        userModel.findOne({token:token},callback);
    },
    removeToken: function(id,callback) {
        userModel.findByIdAndUpdate(id, {$unset: {token: 1}},callback);
    }
};

module.exports = database;