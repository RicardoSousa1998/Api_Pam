const {
    response
} = require('express');
const express = require('express');
const session = require("express-session");
const mustacheExpress = require("mustache-express");
const MySQLStore = require('express-mysql-session')(session);

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');



const mysql = require("mysql")

app.use(express.static("./public"));


app.get("/", (req, res) => {

    db.query('SELECT * FROM item ', function (err, rows) {
        if (err) {
            reject(err)
        } else {
            res.render("lista", {
                items: rows
            });
        }
    });

})

app.post("/add", (req, res) => {
    db.query('INSERT INTO item (Nome, Email, NotasAdicionais, reviewLimpeza, ReviewEspaco,ReviewNormasDGS, ReviewDS,Rating,TotalReviews,Latitude,Longitude) VALUES ( ?,?,?,?,?,?,?,?,?,?,?)', [req.body.Nome, req.body.Email, req.body.NotasAdicionais, req.body.ReviewLimpeza, req.body.ReviewEspaco,req.body.ReviewNormasDGS, req.body.ReviewDS, req.body.Rating,req.body.TotalReviews,req.body.Latitude,req.body.Longitude], function (err, rows) {
        if (err) {
            throw(err)
        } else {
            return res.status(201).json(rows);
        }
    });

})


app.put("/update", (req, res) => {
    db.query('Update item SET reviewLimpeza=?, ReviewEspaco=?,ReviewNormasDGS=?, ReviewDS=?,Rating=?,TotalReviews=? WHERE id =?', [req.body.ReviewLimpeza, req.body.ReviewEspaco,req.body.ReviewNormasDGS, req.body.ReviewDS, req.body.Rating,req.body.TotalReviews,req.body.id], function (err, rows) {
        if (err) {
            throw(err)
        } else {
            return res.status(201).json(rows);
        }
    });

})



app.get("/all", (req, res) => {
    db.query('SELECT * FROM item ', function (err, rows) {
        if (err) {
            reject(err)
        } else {
            return res.status(201).json(rows);
        }
    });

})

app.delete("/del/:id", (req, res) => {
    db.query('DELETE FROM item Where id = ? ', [req.params.id], function (err, rows) {
        if (err) {
            throw (err)
        }
    });

})

app.listen((process.env.PORT || 5000), function () {
    console.log('listening on *:5000');
});
