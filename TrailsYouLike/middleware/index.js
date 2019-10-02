var Trails = require("../models/trails");
var Comment = require("../models/comment");

// put all middle ware into the same file and put it into the same object
var middlewareObj = {};

middlewareObj.checkTrailOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Trails.findById(req.params.id, function(err, foundTrails){
           if(err){
               req.flash("error", "Trail not found");
               res.redirect("back");
           }  else {
               // does user own it
            if(foundTrails.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to operate that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to operate that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to operate that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to operate that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	//needs to do the flash before redirect, and it is a one time thing
    req.flash("error", "You need to be logged in to operate that");
    res.redirect("/login");
}

module.exports = middlewareObj;