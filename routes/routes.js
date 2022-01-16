const { response } = require("express");
const express = require("express");
const testModel = require("../models/test-model");
const UserModel = require("../models/User");
const PremiseModel = require("../models/Premise");
const Test = require("../test");
const EL = require("../parse-excel");
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

app.post("/add_esg", async (request, response) => {
    for (var i=0; i<EL().length; i++)
    {
        const add_esg = new PremiseModel({name: EL()[i]['Email'], 
        entity: EL()[i]['Entity'], country: EL()[i]['Country'], group: EL()[i]['Group'] });
        const add_esg_user = new UserModel({email: EL()[i]['Email'], 
        utilityTypes: EL()[i]['Utility Type'], esgRole: EL()[i]['ESG Role'], 
        entity: EL()[i]['Entity'], country: EL()[i]['Country'], group: EL()[i]['Group'] });
        try {
            //await add_esg.save();
            await add_esg_user.save();
            //response.send(add_esg);
            response.send(add_esg_user);
        } catch (error) {
            response.status(500).send(error);
        }
    }
});

module.exports = app;