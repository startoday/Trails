var mongoose = require("mongoose");
var Trails = require("./models/trails");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Icicle Gorge Nature Loop", 
        image: "https://www.wta.org/site_images/hikes/icicle-gorge_bob-and-barb.jpg-1/@@images/b8ee71e8-1e8a-46f5-a16f-8a758dcf7b57.jpeg",
        description: "The Icicle Gorge Trail, one of the most popular trails in the Okanogan-Wenatchee National Forest, is a wonderful way to explore the natural beauty of the Icicle Creek Valley. The interpretive loop trail has a gentle grade and scenic views of Icicle Creek, Icicle Gorge, and the surrounding forest that are ideal for families, trail runners, beginner hikers, bird enthusiasts, and those looking to take a nice long walk on a well-defined path."
    },
    {
        name: "Spray Park Loop", 
        image: "https://www.wta.org/site_images/hikes/ljcollins-spray-park.jpeg/@@images/846ae74a-8070-4958-b802-1180ab0a8273.jpeg",
        description: "Starting at Mowich Lake, take a short jaunt south on the Wonderland Trail to the Spray Park junction. Merge onto the Spray Park Trail and make a gentle mile-long descent to the edge of Eagle Cliff. The trail then turns east, rounding Hessong Rock and passing the Eagle’s Roost wilderness camp. Shortly past the camp, take the 0.25-mile side trail to Spray Falls, a must-see"
    },
    {
        name: "Mount Baldy", 
        image: "https://www.wta.org/site_images/hikes/mount-baldy.jpeg/@@images/c8066fa9-e09a-4206-8215-d0bd127b3d13.jpeg",
        description: "From the parking area, take the path behind the signs for Easton Ridge (trail #1212) and Kachess Ridge (trail #1315).  Soon after setting off, you'll reach a junction. Turn right onto the Easton Ridge Trail and cross over a wood bridge. Climb moderately steep switchbacks for about 1.5 miles to another junction. Keep left onto the Domerie Divide Trail, (#1308.2)."
    }
]

function seedDB(){
   //Remove all trails
   Trails.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all trails!");
         //add a few trails
        data.forEach(function(seed){
            Trails.create(seed, function(err, trail){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a trail");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, see some deers",
                            author: "Loxi"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                trail.comments.push(comment);
                                trail.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
