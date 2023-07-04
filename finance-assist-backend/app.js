const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./Models');
const userRoutes = require ('./Routes/userRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');

const port = process.env.PORT || 8000;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync");
});

//routes for the API
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transactions', transactionRoutes);
//app.use('/api/v1/reports', reportRoutes);

app.use(express.static('client'));
app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});