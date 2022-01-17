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
    // post Premise
    for (var i=0; i<EL().ESG_array_Premise.length; i++)
    {
        const add_esg = new PremiseModel({name: EL().ESG_array_Premise[i]['Email'], 
        entity: EL().ESG_array_Premise[i]['Entity'], country: EL().ESG_array_Premise[i]['Country'], group: EL().ESG_array_Premise[i]['Group'] });
        try {
            await add_esg.save();
            response.send(add_esg);
        } catch (error) {
            response.status(500).send(error);
        }
    }
    
    // post User
    for (var j=0; j<EL().ESG_array_User.length; j++)
    {
        const add_esg_user = new UserModel({email: EL().ESG_array_User[j]['Email'], 
        utilityTypes: EL().ESG_array_User[j]['Utility Type'], esgRole: EL().ESG_array_User[j]['ESG Role'], 
        entity: EL().ESG_array_User[j]['Entity'], country: EL().ESG_array_User[j]['Country'], group: EL().ESG_array_User[j]['Group'] });
        try {
            await add_esg_user.save();
            response.send(add_esg_user);
        } catch (error) {
            response.status(500).send(error)
        }
    }
    
});

module.exports = app;