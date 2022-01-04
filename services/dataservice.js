var mongoose = require('mongoose');
var schema = mongoose.Schema;
// var eventSchema = {};
// var eventModel;

mongoose.set('debug', true);

var database = {
    connect: function() {
            mongoose.connect('mongodb://127.0.0.1:27017/transportsageDB', function(err){
                if(err==null) {
                    console.log("Connected to Mongo DB");
                    //initialize values
                    // eventSchema = schema({
                    //     name: String,
                    //     description: String,
                    //     start: {
                    //         date: String,
                    //         time: String
                    //     },
                    //     end: {
                    //         date: String,
                    //         time: String
                    //     }
                    // });
                    // var connection = mongoose.connection;
                    // eventModel = connection.model('event', eventSchema);
                } else {
                    console.log("Error connecting to Mongo DB");
                    console.log(err);
                }
            })
        },

        


    };

    module.exports = database;