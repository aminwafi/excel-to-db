const { response } = require("express");
const express = require("express");
const testModel = require("../models/test-model");
const Test = require("../test");
// const EL = require("../parse-excel");
const app = express();

app.get("/users", async (request, response) => {
    const users = await testModel.find({});
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/add_user", async (request, response) => {
    const add_user = new testModel(request.body);
    try {
        await add_user.save();
        response.send(add_user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/add_test", async (request, response) => {
    const add_test = new testModel({name: Test().nama, age: Test().umur});
    try {
        await add_test.save();
        response.send(add_test);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;