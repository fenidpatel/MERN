const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// ADD
router.post("/", auth, async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    const expense = await Expense.create({
      ...req.body,
      userId: req.user.id,
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET
router.get("/", auth, async (req, res) => {
  try {
    const data = await Expense.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE ✅ THIS WAS MISSING
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true } // returns the updated document
    );
    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;