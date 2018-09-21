const express = require("express");
const db = require("../models/burger");

const router = express.Router();

router.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(data) {
        var newBurger = {
            burgers: data
        };
    res.render("index", newBurger);
    }).catch(function(err) {
        console.log(err);
    });
});

router.get("/api/json", function(req, res) {
    db.Burger.findAll({}).then(function(data) {
        var newBurger = {
            burgers: data
        };
    res.json(newBurger);
    }).catch(function(err) {
        console.log(err);
    });
});

router.post("/api/burgers", function(req, res) {

    db.Burger.create({
        burger_name: req.body.burgerName
    }).then(function(data) {
        res.json({burger: "New burger " + data + " added"})
    }).catch(function(err) {
        console.log(err);
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = req.params.id;

    db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: condition
        }
    })
    .then(function(data) {
        res.json(data);
    }).catch(function(err) {
        console.log(err);
    });

    // burger.update({
    //     devoured: req.body.devoured}, 
    //     condition, 
    //     function(result) {
    //         if (result.changedRows == 0) {
    //             // If no rows were changed, then the ID must not exist, so 404
    //             return res.status(404).end();
    //           } else {
    //             res.status(200).end();
    //           }
    // });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = req.params.id;

    db.Burger.destroy({
        where: {
            id: condition
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        console.log(err);
    });
    // burger.delete(condition, function(result) {
    //     if (result.affectedRows == 0) {
    //         return res.status(404).end();
    //       } else {
    //         res.status(200).end();
    //       }
    // });
});

//catch all other route paths
router.get("*", function(req, res) {
    res.send("Sorry our website does not support the current page you are searching for.");
});


module.exports = router;