// const express               =  require('express'),
//       app                   =  express(),
//       mongoose              =  require("mongoose"),
//       passport              =  require("passport"),
//       bodyParser            =  require("body-parser"),
//       LocalStrategy         =  require("passport-local"),
//       passportLocalMongoose =  require("passport-local-mongoose"),
//       User                  =  require("./models/user");
// //Connecting database
// mongoose.connect("mongodb://127.0.0.1:27017/transportsageDB");
// var db = require('./models/feedback.js');
// var db1 = require('./models/topup.js');
// db1.connect();
// db.connect();
// app.use(require("express-session")({
//     secret:"Any normal Word",       //decode or encode session
//     resave: false,          
//     saveUninitialized:false    
// }));
// passport.serializeUser(User.serializeUser());       //session encoding
// passport.deserializeUser(User.deserializeUser());   //session decoding
// passport.use(new LocalStrategy(User.authenticate()));
// app.set("view engine","ejs");
// app.use(bodyParser.urlencoded(
//       { extended:true }
// ))
// app.use(passport.initialize());
// app.use(passport.session());
// //=======================
// //      R O U T E S
// //=======================
// app.get("/", (req,res) =>{
//     res.render("login");
// })
// app.get('/js/*', function(req, res)  {
//     res.sendFile(__dirname+"/views/"+req.originalUrl);
// });
// app.get('/assets/*', function(req, res)  {
//     res.sendFile(__dirname+"/views/"+req.originalUrl);
// });

// app.get("/userprofile", isLoggedIn, function(req,res){
//     User.findById(req.params.id, function(err, foundUser){
//         if(err){
//             req.flash("error","Something went wrong.");
//             res.redirect("/");
//         }
//         res.render("userprofile",{user:foundUser});
//     })
// })
// app.get("/topup", isLoggedIn, function(req,res){
//     User.findById(req.params.id, function(err, foundUser){
//         if(err){
//             req.flash("error","Something went wrong.");
//             res.redirect("/");
//         }
//         res.render("topup",{user:foundUser});
//     })
// })
// app.post("/topup",(req,res)=>{
//     var data = req.body;
//         db1.addTopup(data.bankacc, data.ezlinkID, data.topupAmount,
//             function (err, feedback) {
//                 res.redirect('back');
//             })
// })
// // app.get("/userprofile", function (req, res) {
// //     User.findOne({
// //       id: req.session.id
// //     }, function (err, foundUser) {
// //       if (err) {
// //         req.flash("error", "Something went wrong.");
// //         return res.redirect("/");
// //       }
// //       if (foundUser.length == 0) //Means no data found
// //       {
// //         //Write code for when no such user is there
// //       }
// //       res.render('userprofile', {
// //         user: foundUser,
// //       });
// //     })
// //   });

// //Auth Routes
// app.get("/home",(req,res)=>{
//     res.render("home");
// });
// app.get("/feedback",(req,res)=>{
//     res.render("contact");
// });
// app.post("/feedback",(req,res)=>{
//     var data = req.body;
//         db.addFeedback(data.username, data.phone, data.email, data.type, data.feedback,
//             function (err, feedback) {
//                 res.redirect('back');
//             })
// })
// app.post("/login",passport.authenticate("local",{
//     successRedirect:"/home",
//     failureRedirect:"/",

// }),function (req, res){
//     //  req.session.id = id;
// });
// app.get("/register",(req,res)=>{
//     res.render("register");
// });
// app.post("/register",(req,res)=>{
    
//     User.register(new User({username: req.body.username,phone:req.body.phone,email: req.body.email,password: req.body.password}),req.body.password,function(err,user){
//         if(err){
//             console.log(err);
//             res.render("register");
//         }
//     passport.authenticate("local")(req,res,function(){
//         res.redirect("/");
//     })    
//     })
// })
// app.get("/logout",(req,res)=>{
//     req.logout();
//     res.redirect("/");
// });
// function isLoggedIn(req,res,next) {
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/");
// };


// app.get("/mrtService", async function (req, res) {

//     var axios = require('axios');

//     var config = {
//         method: 'get',
//         url: 'http://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts',
//         headers: {
//             'AccountKey': 'ANSPHEcZTrqPXybaAH3X1A=='
//         }
//     };

//     let x = await axios(config);
//     console.log(x.data.value);
//     //res.send(x.data.value);
//     if (x.data.value.Status == 1) {
//         status_1 = "Mrt working fine";

//         res.render("mrtService", {
//             status: status_1,
//         });

//     } else {
        
        
//         res.render("mrtService", {
//             status_1: status_1,
//             Message: Message,
//             affected_line: affected_line,
//             direction: direction,
//         });
//     }
// });

// //Listen On Server
// app.listen(process.env.PORT ||3000,function (err) {
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Server Started At Port 3000");
//     }
      
// });


