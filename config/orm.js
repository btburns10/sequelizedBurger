const connection = require("./connection");

//helper functions for query structuring
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

const orm = {

    selectAll: function(table, cb) {
        connection.query("SELECT * FROM ??", [table], function(err, data) {
            if(err) {
                throw err;
            }
            cb(data);
        })
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ")";
        
        connection.query(queryString, vals, function(err, result) {
            if(err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE id = ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if(err) {
                throw err;
            }
            cb(result);
        });
    },

    deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
    
        queryString += " WHERE id = ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
                if(err) {
                    throw err;
                }
                cb(result);
            });
    }
}


module.exports = orm;