var express = require("express");
var router = express.Router();

const { listUsers, getUser, getUserByName, createUser } = require("../services/UserService");

router.get("/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);

    listUsers(function(response){

        // If users have been found.
        if(response != null) {
            if(response.length >= 1) {
                res.status(200);
                res.header("Content-Type",'application/json');
                res.send(JSON.stringify(response, null, 4));
            } else {
                res.status(204);
                res.send(null);
            }
        } 
        // Otherwise
        else 
        {
            res.status(404);
            res.send(null);
        }
    });

});

router.get("/:id(\\d+)/", function(req, res) {

    getUser(req.params.id, function(response){

        // If an user has been found.
        if(response != null) {

            var foundUser = {
                id: response.id,
                name: response.name,
                createdAt: response.createdAt
            };

            res.status(200);
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(foundUser, null, 4));
        } 
        // Otherwise
        else 
        {
            res.status(404);
            res.send(null);
        }
    });

});

router.post("/", function(req, res) {

    let latestUser = {};
    const newUser = {
        name: req.body.name,
        password: req.body.password
    };

    getUserByName(newUser.name, function(response){
        // There's already an user with this name.
        if(response.length > 0) {
            res.status(409);
            res.send("There's already an user with this name.");
        } else {
            createUser(newUser, function(response){
                latestUser.id = response.id;
                latestUser.name = response.name;
                latestUser.createdAt = response.createdAt;
        
                res.status(201);
                res.header("Content-Type",'application/json');
                res.send(JSON.stringify(latestUser, null, 4));
            });
        }
        
    });

});

router.put("/:id(\\d+)/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.delete("/:id(\\d+)/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

module.exports = router;