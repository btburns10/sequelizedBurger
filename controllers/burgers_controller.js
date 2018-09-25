const db = require("../models");


module.exports = function(app) {

app.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(data) {
        res.render("index", {burgers: data});
    }).catch(function(err) {
        console.log(err);
    });
});

app.get("/api/json", function(req, res) {
    db.Burger.findAll({}).then(function(data) {
        var newBurger = {
            burgers: data
        };
    res.json(newBurger);
    }).catch(function(err) {
        console.log(err);
    });
});

app.post("/api/burgers", function(req, res) {

    db.Burger.create({
        burger_name: req.body.burgerName
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        console.log(err);
    });
});

app.put("/api/burgers/:id", function(req, res) {
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
});

app.delete("/api/burgers/:id", function(req, res) {
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
});

//catch all other route paths
app.get("*", function(req, res) {
    res.send("Sorry our website does not support the current page you are searching for.");
});

}