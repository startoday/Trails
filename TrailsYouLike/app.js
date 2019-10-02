var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Trails  = require("./models/trails"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    trailRoutes 	 = require("./routes/trails"),
    indexRoutes      = require("./routes/index")
    
//mongoose.connect("mongodb://localhost/yelpTrail");
mongoose.connect("mongodb+srv://huahua:caocao@cluster0-onvnu.mongodb.net/test?retryWrites=true&w=majority")


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "LALALALA I love frozen!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.locals.moment = require('moment');

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	//so the message can go every page
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/trails", trailRoutes);
app.use("/trails/:id/comments", commentRoutes);


app.listen(3000, function(){ 
  	console.log('Server listening on port 3000'); 
	console.log('The Trial yelp Server Has Started!'); 
});

/*
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Trial yelp Server Has Started!");
});
*/