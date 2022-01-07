var mongoose = require('mongoose');
var schema = mongoose.Schema;
var topupSchema = {};
var topupModel;

mongoose.set('debug', true);

var database = {
    connect: function() {
            mongoose.connect('mongodb://127.0.0.1:27017/transportsageDB', function(err){
                if(err==null) {
                    console.log("Connected to Mongo DB");
                    //initialize values
                    topupSchema = schema({
                        bankacc: String,
                        ezlinkID:String,
                        topupAmount:Number
                    });
                    var connection = mongoose.connection;
                    topupModel = connection.model('Topup', topupSchema);
                } else {
                    console.log("Error connecting to Mongo DB");
                    console.log(err);
                }
            })
        },

        addTopup: function(n, p, e, callback) {
            var newTopup = new topupModel({
                bankacc: n,
                ezlinkID: p,
                topupAmount: e,
            });
            newTopup.save(callback);
        },

    };

    module.exports = database;
