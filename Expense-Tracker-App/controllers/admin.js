const Expense = require("../models/expense");

exports.getEditExpense = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/expenditure-list");
    } //This if statement is optional here.
    const expenseId = req.params.expenseId;
    req.user
        .getExpenses({ where: { id: expenseId } })
        .then((expenses) => {
            if (!expenses[0]) {
                return res.redirect("/expenditure-list"); //If we don't have an expense with that id.
            }
            res.render("edit-expense", {
                pageTitle: "Edit Expense",
                path: "/edited-expense", //Here we have to pass the product id to be edited.
                editing: editMode,
                e: expenses[0],
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postEditExpense = (req, res, next) => {
    const expenseId = req.body.expenseId;
    const updatedAmount = req.body.expenseamount;
    const updatedCategory = req.body.expensecategory;
    const updatedDescription = req.body.expensedescription;
   Expense.findByPk(expenseId)
   .then((expense) => {
       expense.amount = updatedAmount;
       expense.category = updatedCategory;
       expense.description = updatedDescription;
       return expense.save(); // A sequelize method to update the expense in the db if it already exists or create a new one if it doesn't.
   })
   .then((result) => {
    console.log("UPDATED PRODUCT!");
    res.redirect('/expenditure-list');
   })
   .catch((err) => {
    console.log(err);
   });
};

exports.DeleteExpense = (req, res, next) => {
    const deleteMode = req.query.delete;
    if (!deleteMode) {
        return res.redirect("/expenditure-list");
    } //This if statement is optional here.
    const expenseId = req.params.expenseId;
    Expense.findByPk(expenseId)
        .then((expense) => {
            return expense.destroy();
        })
        .then((result) => {
            console.log("PRODUCT DELETED");
            res.redirect("/expenditure-list");
        })
        .catch((err) => {
            console.log(err);
        });
};