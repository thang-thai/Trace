const apiController = {};
const TransactionModel = require('../models/transactionModel');

apiController.getExpenses = async (req, res, next) => {
  try {
    const data = await TransactionModel.find({});
    res.locals.expenses = data;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.getExpenses',
      msg: { err: 'ERROR: Error in apiController.getExpenses' },
    });
  }
};

apiController.addExpense = async (req, res, next) => {
  const { expense, amount, category, date } = req.body;
  try {
    const data = await TransactionModel.create({
      expense,
      amount,
      category,
      date,
    });
    res.locals.data = data;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.addExpense',
      msg: { err: 'ERROR: Error in apiController.addExpense' },
    });
  }
};

apiController.updateExpense = async (req, res, next) => {
  const { expense, amount, category, date, editId } = req.body;
  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: editId },
      { expense, amount, category, date }
    );
    res.locals.data = data;
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.addExpense',
      msg: { err: 'ERROR: Error in apiController.addExpense' },
    });
  }
};

apiController.deleteExpense = async (req, res, next) => {
  const { data: id } = req.body;
  try {
    await TransactionModel.findByIdAndDelete({ _id: id });
    return next();
  } catch (error) {
    return next({
      log: 'ERROR: Error in apiController.addExpense',
      msg: { err: 'ERROR: Error in apiController.addExpense' },
    });
  }
};

// export controller
module.exports = apiController;