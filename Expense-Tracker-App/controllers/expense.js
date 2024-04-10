const Expense = require("../models/expense");


exports.getIndex = (req, res, next) => {
    res.render("index", {
        path: "/",
    });
};

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
    .then((expenses) => {
        res.render("expenditure-list", {
                        expenses: expenses,
                        path: "/expenditure-list",
                    });
    })
    .catch((err) => {
        console.log(err);
    });

}

exports.postAddExpense = (req, res, next) => {
    const amount = req.body.expenseamount;
    const category = req.body.expensecategory;
    const description = req.body.expensedescription;
    req.user.createExpense({
        amount: amount,
        category: category,
        description: description,
    })
    .then((result) => {
        console.log(result);
        console.log("Created the Expense");
        res.redirect("/expenditure-list");
    })
    .catch((err) => {
        console.log(err);
    })
}



