var express = require("express");
var router  = express.Router();
var Trails = require("../models/trails");
var middleware = require("../middleware");

//INDEX - show all trails in the DB
router.get("/", function(req, res){
    // Get all trails from DB
    Trails.find({}, function(err, allTrails){
       if(err){
           console.log(err);
       } else {
          res.render("trails/index",{trails:allTrails, page: 'trails'});
       }
    });
});

//CREATE - add new trail to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to trails array
    var name = req.body.name;
	var price = req.body.price;
	var length = req.body.length;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
	

	 var newTrail = {name: name, price: price, length: length, image: image, description: desc, author:author}
	// Create a new trail and save to DB
	Trails.create(newTrail, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to trails page
			console.log(newlyCreated);
			res.redirect("/trails");
		}
		
    });
});

//NEW - show form to create new trail
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("trails/new"); 
});

// SHOW - shows more info about one trail
router.get("/:id", function(req, res){
    //find the trail with provided ID
    Trails.findById(req.params.id).populate("comments").exec(function(err, foundTrails){
        if(err){
            console.log(err);
        } else {
            console.log(foundTrails)
            //render show template with that trail
            res.render("trails/show", {trail: foundTrails});
        }
    });
});

// EDIT Trail ROUTE
router.get("/:id/edit", middleware.checkTrailOwnership, function(req, res){
    Trails.findById(req.params.id, function(err, foundTrails){
        res.render("trails/edit", {trail: foundTrails});
    });
});

// UPDATE Trail ROUTE
router.put("/:id",middleware.checkTrailOwnership, function(req, res){
    // find and update the correct trail

		Trails.findByIdAndUpdate(req.params.id, req.body.trail, function(err, updatedTrails){
		   if(err){
			   res.redirect("/trails");
		   } else {
			   //redirect somewhere(show page)
			   res.redirect("/trails/" + req.params.id);
		   }

    });
});

// DESTROY  ROUTE
router.delete("/:id",middleware.checkTrailOwnership, function(req, res){
   Trails.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/trails");
      } else {
          res.redirect("/trails");
      }
   });
});


module.exports = router;

