const db = require("../models/burger");


module.exports = function(app) {

app.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(data) {
        var newBurger = {
            burgers: data
        };
    res.render("index", newBurger);
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
        res.json({burger: "New burger " + data + " added"})
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
    // burger.delete(condition, function(result) {
    //     if (result.affectedRows == 0) {
    //         return res.status(404).end();
    //       } else {
    //         res.status(200).end();
    //       }
    // });
});

//catch all other route paths
app.get("*", function(req, res) {
    res.send("Sorry our website does not support the current page you are searching for.");
});

}