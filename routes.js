// var bodyParser=require("body-parser");
var express = require('express');
var crypto = require('crypto');
var db = require('./services/dataservice.js');
const { redirect } = require('express/lib/response');
db.connect();

var router = require('express').Router();

router.use(express.urlencoded({
    extended: true
}));

router.use(function(req,res,next){
    //only check for token if it is PUT, DELETE methods or it is POSTING to events
    if((req.method=="POST" && req.url.includes("/userprofile") ) || (req.method=="DELETE" && req.url.includes("/userprofile") ) ) {
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided. You are not allowed to perform this action.");
        } else {
            db.checkToken(token, function (err, user) {
                if (err || user == null) {
                    res.status(401).send("[Invalid token] You are not allowed to perform this action.");
                } else {
                    //set a local variable to be used for the next route
                    res.locals.user = user; // set as organizer object
                    //means proceed on with the request.
                    next();
                }
            });
        }
    } else {    //all other routes will pass
        next();
    }
});

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/login.html");
});

router.get('/register', function (req, res) {
    res.sendFile(__dirname + "/views/register.html");
});
router.get('/home', function (req, res) {
    res.sendFile(__dirname + "/views/home.html");
});
router.get('/feedback', function (req, res) {
    res.sendFile(__dirname + "/views/contact.html");
});

router.get('/profile', function (req, res) {
    res.sendFile(__dirname + "/views/userprofile.html");
});

router.get('/topup', function (req, res) {
    res.sendFile(__dirname + "/views/topup.html");
});

router.get('/services', function (req, res) {
    res.sendFile(__dirname + "/views/services.html");
});
router.get('/googlemap', function (req, res) {
    res.sendFile(__dirname + "/views/googlemap.html");
});
router.get('/taxistops', function (req, res) {
    res.sendFile(__dirname + "/views/taxistops.html");
});

router.get('/mrtService', function (req, res) {
    res.sendFile(__dirname + "/views/mrtService.html");
});
router.get('/weather', function (req, res) {
    res.sendFile(__dirname + "/views/weatherforecast.html");
});

router.get('/edit', function (req, res) {
    res.sendFile(__dirname + "/views/edituserprofile.html");
});

router.get('/assets/*', function(req, res)  {
    res.sendFile(__dirname+"/views/"+req.originalUrl);
});

router.get('/js/*', function(req, res)  {
    res.sendFile(__dirname+"/views/"+req.originalUrl);
});

router.post('/register', function (req, res) {
    var data = req.body;
    db.addUser(data.username, data.password, data.phone, data.email, function (err, user) {
        if (err) {
            res.status(500).send("Unable to register a new user");
        } else {
            res.status(200).send("User has been registered!");
        }
    })
})

router.post('/', function (req, res) {
    var data = req.body;
    db.login(data.username, data.password, function (err, user) {
        if (err) {
            res.status(401).send("Login unsucessful. Please try again later");
        } else {
            if (user == null) {
                res.status(401).send("Login unsucessful. Please try again later");
            } else {
                var strToHash = user.username + Date.now();
                var token = crypto.createHash('md5').update(strToHash).digest('hex');
                db.updateToken(user._id, token, function (err, user) {
                    res.status(200).json({ 'message': 'Login successful.', 'token': token });
                });
            }
        }
    })
})

router.get("/logout", function (req, res) {
    var token = req.query.token;
    if (token == undefined) {
        res.status(401).send("No tokens are provided");
    } else {
        db.checkToken(token, function (err, user) {
            if (err || user == null) {
                res.status(401).send("Invalid token provided");
            } else {
                db.removeToken(user._id, function (err, user) {
                    res.status(200).send("Logout successfully")
                });
            }
        })
    }
})

router.post("/feedback", function (req,res){
    var token = req.query.token;
        var data = req.body;
            db.addFeedback(data.username, data.phone, data.email, data.type, data.feedback,
                function (err, feedback) {
                    res.redirect('back');
                })
    })

router.post('/topup', function (req, res) {
    var data = req.body;
    db.addTopup(data.Topupvalue, data.CanID, data.Bankaccountnum,
        function (err, Topupamount) {
            res.redirect('back');
        })
});

router.get('/availservices', function (req, res) {
    db.getAllService(function(err,services){
        if (err) {
            res.status(500).send("Unable to get all services");
        } else {
            res.status(200).send(services);
        }
    })
})

router.post('/userprofile', function (req, res) {
    var data = req.body;
    var userId = res.locals.user._id; // retrieve fr organizer object
    db.addAddress(data.name, data.description, data.address, data.postal, userId,
        function (err, address) {
            if (err) {
                res.status(500).send("Unable to add a new address");
            } else {
                res.status(200).send("Address has been successfully added!");
            }
        })
});

router.get('/userprofile', function (req, res) {
    db.getAddress( function (err, address) {
        if (err) {
            res.status(500).send("Unable to find addresses");
        } else {
            res.status(200).send(address);
        }
    })
})
router.get('/userprofile/:id', function (req, res) {
    var id = req.params.id;
    db.getAddressbyId(id, function (err, address) {
        if (err) {
            res.status(500).send("Unable to find an address with this id");
        } else {
            res.status(200).send(address);
        }
    })
})

router.put('/userprofile', function (req, res) {
    var data = req.body;
    db.updateAddress(data.id, data.name, data.description, data.address, data.postal,
        function (err, address) {
            if (err) {
                res.status(500).send("Unable to update the address");
            } else {
                if (address == null) {
                    res.status(200).send("No address is updated");
                } else {
                    res.status(200).send("Address has been updated successfully");
                }
            }
        });
})


router.delete('/userprofile/:id', function (req, res) {
    var id = req.params.id;
    db.deleteAddress(id, function (err, address) {
        if (err) {
            res.status(500).send("Unable to delete the address");
        } else {
            if (address == null) {
                res.status(200).send("No address is deleted");
            } else {
                res.status(200).send("Address has been deleted successfully");
            }
        }
    });
})

router.get('/stops', function (req, res) {
    db.getAllTaxiStops(function(err,stops){
        if (err) {
            res.status(500).send("Unable to get all taxi stops");
        } else {
            res.status(200).send(stops);
        }
    })
})



module.exports = router;