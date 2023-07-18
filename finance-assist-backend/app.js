const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./Models');

// Importing routers
const userRoutes = require ('./Routes/userRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const reportRoutes = require('./Routes/reportRoutes');

const port = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync");
});

// Routes for the API
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/reports', reportRoutes);

app.use(express.static('client'));

app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});