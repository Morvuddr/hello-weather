const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "expressuser",
    database: "favorites",
    password: "123456"
});

const createNewCity = (name, callback) => {
    const sql = `INSERT INTO cities(name) VALUES(?)`;
    connection.query(sql, name, function(err, result){
            if(err) {
                callback(err);
            } else {
                console.log(result);
                callback(null);
            }
        });
};

const readCities = (callback) => {
    const sql = "SELECT * FROM cities";
    connection.query(sql, function(err, result){
        if (err) {
            callback(err, null);
        } else {
            let cities = [];
            for(let i=0; i < result.length; i++){
                cities.push( { name: result[i].name });
            }
            callback(null, cities);
        }
    });
};

const deleteCity = (name, callback) => {
    const sql = "DELETE FROM cities WHERE name=?";
    connection.query(sql, name, function (err, result) {
        console.log(result);
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
};

exports.readCities = readCities;
exports.createNewCity = createNewCity;
exports.deleteCity = deleteCity;