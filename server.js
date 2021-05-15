require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const swaggerDoc = require('./swagger');

const routerUser = require('./rest/user');
const routerAdmin = require('./rest/admin');
const routerDoctor = require('./rest/doctor');
const routerStore = require('./rest/store');
const routerRecipe = require('./rest/recipe');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true} , function(err, db) {
    if (err) {
        console.log('Unable to connect to the Database with uri : ', process.env.MONGODB_URI);
    } else {
        console.log("MongoDB database connection established successfully");
    }
});

app.use('/api/user', routerUser);
app.use('/api/admin', routerAdmin);
app.use('/api/doctor', routerDoctor);
app.use('/api/store', routerStore);
app.use('/api/recipe', routerRecipe);

swaggerDoc(app);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});