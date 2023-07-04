const transactionService = require('../Services/transactionService');
const {User} = require("../Models/userModel");

async function getAllTransactions(req, res) {
    const transactions = await transactionService.getAll();

    if(transactions.length > 0) {
        res.status(200).send({
            success: true,
            data: {
                transactions: transactions
            }
        });
    } else {
        return res.status(404).send({
            success: false,
            message: "No transaction found."
        });
    }
}

async function getTransaction(req, res) {
    const id = req.params.id;

    try {
        const transaction = await transactionService.getById(id);
        if(transaction){
            res.status(200).send({
                success: true,
                data: {
                    transaction: transaction
                }
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "Transaction not found."
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).send("Something went wrong...");
    }

}

async function addTransaction(req, res) {
    const {title, type, date, sender, receiver, value, comment, user_id} = req.body;

    if(type !== "income" && type !== "expense") {
        return res.status(409).send({success: false, message: "'type' is not valid."})
    }

    try {
        const data = {
            title: title,
            type: type,
            date: date,
            sender: sender,
            receiver: receiver,
            value: value,
            comment: comment ? comment : null,
            user_id: user_id ? user_id : 1
        }
        const transaction = await transactionService.add(data);

        if (transaction) {
            res.status(201).send({success: true, transaction: transaction});
        } else {
            return res.status(409).send("Data is not correct");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong...");
    }
}

module.exports = {
    getAllTransactions,
    getTransaction,
    addTransaction
}