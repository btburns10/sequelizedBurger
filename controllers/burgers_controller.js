const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

router.get("/", function(req, res) {
    burger.all(function(data) {
        var newBurger = {
            burgers: data
        };
    res.render("index", newBurger);
    });
});

router.get("/api/json", function(req, res) {
    burger.all(function(data) {
        var newBurger = {
            burgers: data
        };
    res.json(newBurger);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name", "devoured"], [req.body.burgerName, req.body.devoured], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = req.params.id;

    burger.update({
        devoured: req.body.devoured}, 
        condition, 
        function(result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
              } else {
                res.status(200).end();
              }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    });
});

//catch all other route paths
router.get("*", function(req, res) {
    res.send("Sorry our website does not support the page you are searching for.");
});


module.exports = router;