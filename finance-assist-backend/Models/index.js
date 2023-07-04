//importing modules
const {Sequelize, DataTypes} = require('sequelize');

//database connection
const sequelize = new Sequelize(
    `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    {dialect: "postgres"}
);

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`);
}).catch((err) => {
    console.log(err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require('./userModel')(sequelize, DataTypes);
db.transactions = require('./transactionModel')(sequelize, DataTypes);

db.users.hasMany(db.transactions, {foreignKey: 'user_id'});

//exporting the module
module.exports = db;