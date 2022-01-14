const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/routes.js");

const username = "admin";
const password = "1234";
const cluster = "cluster0";
const dbname = "myFirstDatabase";

const app = express();
app.use(express.json());

var url = `mongodb+srv://${username}:${password}@${cluster}.5wakh.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
    url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true // avoid DepreciationWarning
    }
);

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", function () {
    console.log("Connected successfully")
});

app.use(userRouter);

app.listen(3000, function() {
    console.log("Server is running at port 3000");
});


