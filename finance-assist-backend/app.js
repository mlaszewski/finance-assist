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

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
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