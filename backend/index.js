require("dotenv").config();
const express = require("express");
const mysql = require('mysql')
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aspxpro99h!atus",
    database: "test"
});

app.get("/employees", (req, res) => {
    const query = "SELECT * FROM employees";

    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/employees/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM employees WHERE id = (?)"
    const values = [id];

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/employees", (req, res) => {
    const query = "INSERT INTO employees (`firstname`, `lastname`, `phone`, `email`) VALUES (?)";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.phone,
        req.body.email
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.put("/employees/:id", (req, res) => {
    const id = req.params.id;

    const query = "UPDATE employees set `firstname` = ?, `lastname` = ?, `phone` = ?, `email` = ? WHERE id = ?";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.phone,
        req.body.email
    ];

    db.query(query, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.delete("/employees/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM employees WHERE id = ?";

    db.query(query, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json();
    })
})

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
