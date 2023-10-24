const transactionService = require('../Services/transactionService');

const types = ["income", "outgo"];

exports.getAllTransactions = async (req, res) => {
    const user = req.user;
    const { size, page, orderBy, orderWay } = req.query;
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    const order = [orderBy ? orderBy : 'date', orderWay ? orderWay : 'desc'];

    try {
        const data = await transactionService.getPagination(user.id, limit, offset, order);

        const { count: totalItems, rows: transactions } = data;

        if(transactions.length > 0) {
            res.status(200).send({
                success: true,
                data: {
                    totalItems: totalItems,
                    transactions: transactions,
                    totalPages: Math.ceil(totalItems / limit),
                    currentPage: page ? +page : 0,
                    orderBy: order[0],
                    orderWay: order[1]
                }
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "No transaction found."
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message || "Some error occurred while retrieving data."
        });
    }

}

exports.getTransaction = async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    try {
        const transaction = await transactionService.getById(user.id, id);
        if(transaction){
            if(transaction.user_id === user.id){
                res.status(200).send({
                    success: true,
                    data: {
                        transaction: transaction
                    }
                });
            } else {
                return res.status(403).send({
                    auth: false,
                    message: "Unauthorized."
                });
            }
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

exports.addTransaction = async (req, res) => {
    const { title, type, date, sender, receiver, value, comment } = req.body;

    const user = req.user;

    if(types.indexOf(type) === -1) {
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
            comment: comment || null,
            user_id: user.id
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