const { response } = require("express");
const express = require("express");
const userModel = require("./models/models");
const Test = require("./test");
const app = express();

app.get("/users", async (request, response) => {
    const users = await userModel.find({});
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/add_user", async (request, response) => {
    const add_user = new userModel(request.body);
    try {
        await add_user.save();
        response.send(add_user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/add_test", async (request, response) => {
    const add_test = new userModel({name: Test().nama, age: Test().umur});
    try {
        await add_test.save();
        response.send(add_test);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;