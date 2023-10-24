const transactionService = require('../Services/transactionService');

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

// SUMMARIES
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