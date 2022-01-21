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

// router.use(function(req,res,next){
//     //only check for token if it is PUT, DELETE methods or it is POSTING to events
//     if(req.method=="PUT" || req.method=="DELETE"
//         || (req.method=="POST" && req.url.includes("/events"))) {
//         var token = req.query.token;
//         if (token == undefined) {
//             res.status(401).send("No tokens are provided. You are not allowed to perform this action.");
//         } else {
//             db.checkToken(token, function (err, user) {
//                 if (err || user == null) {
//                     res.status(401).send("[Invalid token] You are not allowed to perform this action.");
//                 } else {
//                     //set a local variable to be used for the next route
//                     res.locals.user = user; // set as organizer object
//                     //means proceed on with the request.
//                     next();
//                 }
//             });
//         }
//     } else {    //all other routes will pass
//         next();
//     }
// });

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

router.get('/userprofile', function (req, res) {
    res.sendFile(__dirname + "/views/userprofile.html");
});

router.get('/topup', function (req, res) {
    res.sendFile(__dirname + "/views/topup.html");
});

router.get('/mrtService', function (req, res) {
    res.sendFile(__dirname + "/views/mrtService.html");
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

router.get("/userprofile/:token", function (req, res) {
    var token = req.query.token;
    if (token == undefined) {
        res.status(401).send("No tokens are provided");
    } else {
        db.checkToken(token, function (err, user) {
            if (err || user == null) {
                res.status(401).send("Invalid token provided");
            } else {
                db.getUser(function (err, user) {
                    res.status(200).send("Logout successfully", user)
                });
            }
        })
    }
})

router.post("/feedback", function (req,res){
        var data = req.body;
            db.addFeedback(data.username, data.phone, data.email, data.type, data.feedback,
                function (err, feedback) {
                    res.redirect('back');
                })
    })

router.post('/Topupamounts', function (req, res) {
    var data = req.body;
    db.addEvent(data.Topupvalue, data.CanID, data.Bankaccountnum,
        function (err, Topupamount) {
            res.redirect('back');
        })
});

module.exports = router;