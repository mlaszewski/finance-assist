const transactionService = require('../Services/transactionService');

const types = ["income", "outgo"];

const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay();

    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff)).toISOString();
}
const getSunday = (d) => {
    const date = new Date(getMonday(d));
    const diff = date.getDate() + 6;

    return new Date(date.setDate(diff)).toISOString();
}

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

const fetchSummary = async (res, user_id, timestamp) => {
    const transactions = await transactionService.getSummary(user_id, timestamp);

    if(transactions.length > 0) {
        res.status(200).send({
            success: true,
            data: {
                totalItems: transactions.length,
                transactions: transactions,
            }
        });
    } else {
        return res.status(404).send({
            success: false,
            message: "No transaction found."
        });
    }

}

exports.getWeekSummary = async (req, res) => {
    const now = new Date();
    const user = req.user;

    const timestamp = {
        from: getMonday( now ),
        to: getSunday( now )
    };

    try {
        await fetchSummary(res, user.id, timestamp);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message || "Some error occurred while retrieving data."
        });
    }
}
exports.getMonthSummary = async (req, res) => {
    const now = new Date();
    const user = req.user;

    const timestamp = {
        from: now.setDate(1),
        to: new Date( now.getFullYear(), now.getMonth()+1, 0, 1 )
    };

    try {
        await fetchSummary(res, user.id, timestamp);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message || "Some error occurred while retrieving data."
        });
    }
}

exports.getYearSummary = async (req, res) => {
    const now = new Date();
    const user = req.user;

    const timestamp = {
        from: new Date(now.getFullYear(), 0, 1, 1),
        to: new Date(now.getFullYear() + 1, 0, 0, 1)
    };

    try {
        await fetchSummary(res, user.id, timestamp);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message || "Some error occurred while retrieving data."
        });
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