var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var feedbackSchema = {};
var topupSchema = {};
var serviceSchema = {};
var addressSchema = {};
var taxistopSchema = {};
var busserviceSchema = {};
var buyticketSchema = {};
var userModel, feedbackModel, topupModel, serviceModel, addressModel, taxistopModel, busserviceModel, buyticketModel;

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
                    ezlinkID: String,
                    topupAmount: Number
                });
                serviceSchema = schema({
                    name: String,
                    description: String,
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
                taxistopSchema = schema({
                    id: String,
                    TaxiCode: String,
                    Latitude: Number,
                    Longtitude: Number,
                    Bfa: String,
                    Ownership: String,
                    Type: String,
                    Name: String
                });
                busserviceSchema = schema({
                    id: String,
                    ServiceNo: String,
                    Operator: Number,
                    Direction: String,
                    Category: String,
                    OriginCode: String,
                    DestinationCode: String,
                    AM_Peak_Freq: String,
                    AM_Offpeak_Freq: String,
                    PM_Peak_Freq: String,
                    PM_Offpeak_Freq: String,
                    LoopDesc: String
                });
                buyticketSchema = schema({
                    date: String,
                    numofticket: String,
                    totalamount: String,
                    cardnum: String,
                });

                var connection = mongoose.connection;
                userModel = connection.model('users', userSchema);
                feedbackModel = connection.model('feedbacks', feedbackSchema);
                topupModel = connection.model('topups', topupSchema);
                serviceModel = connection.model('availservices', serviceSchema);
                addressModel = connection.model('addresses', addressSchema);
                taxistopModel = connection.model('taxistops', taxistopSchema);
                busserviceModel = connection.model('busservices', busserviceSchema);
                buyticketModel = connection.model('tickets', buyticketSchema)
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addFeedback: function (n, p, e, t, f, callback) {
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

    getUser: function (id, token, callback) {
        userModel.findById(id, { token: token }, callback);
    },
    login: function (u, p, callback) {
        userModel.findOne({ username: u, password: p }, callback);
    },
    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function (token, callback) {
        userModel.findOne({ token: token }, callback);
    },
    removeToken: function (id, callback) {
        userModel.findByIdAndUpdate(id, { $unset: { token: 1 } }, callback);
    },
    addTopup: function (n, p, e, callback) {
        var newTopup = new topupModel({
            bankacc: n,
            ezlinkID: p,
            topupAmount: e,
        });
        newTopup.save(callback);
    },
    getAllService: function (callback) {
        serviceModel.find({}, callback);
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


    addbuyticket: function (d, not, n, cn, callback) {
        var newbuyticket = new buyticketModel({
            date: d,
            numofticket: not,
            totalamount: n,
            cardnum: cn
        })
        newbuyticket.save(callback);
    },


    getAddress: function (callback) {
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
    getAllTaxiStops: function (callback) {
        taxistopModel.find({}, callback);
    },
    getAllBusServices: function (callback) {
        busserviceModel.find({}, callback);
    },



};


module.exports = database;