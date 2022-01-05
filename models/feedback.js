var mongoose = require('mongoose');
var schema = mongoose.Schema;
var feedbackSchema = {};
var feedbackModel;

mongoose.set('debug', true);

var database = {
    connect: function() {
            mongoose.connect('mongodb://127.0.0.1:27017/transportsageDB', function(err){
                if(err==null) {
                    console.log("Connected to Mongo DB");
                    //initialize values
                    feedbackSchema = schema({
                        username: String,
                        phone:String,
                        email:String,
                        type:String,
                        feedback:String
                    });
                    var connection = mongoose.connection;
                    feedbackModel = connection.model('feedback', feedbackSchema);
                } else {
                    console.log("Error connecting to Mongo DB");
                    console.log(err);
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

    };

    module.exports = database;
