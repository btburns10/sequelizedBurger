var mysql = require("mysql");

var source = {

    localhost: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "burgers_db"
    },

    jawsDB: {
        host: "o677vxfi8ok6exrd.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "sj614jqlf6i5s4yn",
        password: "ckr18ye9djfufg10",
        database: "opytoywl33r5yjn6"
    }
};

//connect into mysql
var connection = mysql.createConnection(source.localhost);

connection.connect(function(err) {
    if(err) {
        console.log("Error connecting: " + err.stack);
        return;
    }
    else {
        console.log("Connected as id: " + connection.threadId);
    }
});


module.exports = connection;