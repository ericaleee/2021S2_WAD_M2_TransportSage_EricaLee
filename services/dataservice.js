var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var feedbackSchema = {};
var topupSchema = {};
var serviceSchema ={};
var addressSchema = {};
var userModel, feedbackModel, topupModel, serviceModel, addressModel;

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

                topupSchema = schema({
                    bankacc: String,
                    ezlinkID:String,
                    topupAmount:Number
                });
                serviceSchema = schema({
                    name: String,
                    description:String,
                });
                addressSchema = schema({
                    name: String,
                    description: String,
                    address: String,
                    postal: String,
                    user: {
                        type: schema.Types.ObjectId,
                        ref: 'users'
                    }            
                });
                var connection = mongoose.connection;
                userModel = connection.model('users', userSchema);
                feedbackModel = connection.model('feedbacks', feedbackSchema);
                topupModel = connection.model('topups', topupSchema);
                serviceModel = connection.model('availservices', serviceSchema);
                addressModel = connection.model('addresses', addressSchema);
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
    },
    addTopup: function(n, p, e, callback) {
        var newTopup = new topupModel({
            bankacc: n,
            ezlinkID: p,
            topupAmount: e,
        });
        newTopup.save(callback);
    },
    getAllService: function(callback){
        serviceModel.find({},callback);
    },
    addAddress: function (n, d, a, pc, uid, callback) {
        var newAddress = new addressModel({
            name: n,
            description: d,
            address: a,
            postal: pc,
            user: uid
        });
        newAddress.save(callback);
    },
    getAddress: function ( callback) {
        addressModel.find({}).populate('user', 'username').exec(callback);
    },
    getAddressbyId: function (id, callback) {
        addressModel.findById(id).populate('user', 'username').exec(callback);
    },
    updateAddress: function (id, n, d, a, p, callback) {
        var updatedAddress = {
            name: n,
            description: d,
            address: a,
            postal: p
        };
        addressModel.findByIdAndUpdate(id, updatedAddress, callback);
    },
    deleteAddress: function (id, callback) {
        addressModel.findByIdAndDelete(id, callback);
    },
};

module.exports = database;