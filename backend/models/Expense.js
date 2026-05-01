const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: String,
  title: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expense", ExpenseSchema);