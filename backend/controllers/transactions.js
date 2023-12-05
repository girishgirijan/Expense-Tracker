const IncomeSchema = require("../models/IncomeModel");
const ExpenseSchema = require("../models/ExpenseModel");
const User = require("../models/UserModel");

const bcrypt = require("bcrypt");

// ***** User ******//
// Register

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(400)
        .json({ message: "Email is already exist!", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ message: "Registration has been successfull", status: true });
  } catch (error) {
    res.status(500).json({ message: "Server error!", status: false });
  }
};

// Login
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", status: false });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Incorrect email or password!", status: false });

    //Checking password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password!", status: false });
    } else {
      delete user.password;
      return res
        .status(200)
        .json({ status: true, user, message: "Login success" });
    }

    //Dont need to return password. So deleting it from object user
    delete user.password;
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

// ***** Income ***** //
//Add new income
module.exports.addIncome = async (req, res) => {
  const { user, title, amount, category, description, date } = req.body;
  const income = IncomeSchema({
    user,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Invalid amount!" });
    }

    await income.save();
    res.status(200).json({ message: "New income added!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

//Get all incomes
module.exports.getIncomes = async (req, res) => {
  try {
    const { id } = req.params; 
    const incomes = await IncomeSchema.find({user: id}).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

//Delete a specific income

module.exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income deleted!" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error!" });
    });
};

// ***** Income ***** //

// ***** Expense ***** //
//Add new expense
module.exports.addExpense = async (req, res) => {
  const { user, title, amount, category, description, date } = req.body;
  const expense = ExpenseSchema({
    user,
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Invalid amount!" });
    }

    await expense.save();
    res.status(200).json({ message: "New expense added!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

//Get all expenses
module.exports.getExpenses = async (req, res) => {
  try {
    const { id } = req.params; 
    const expenses = await ExpenseSchema.find({user: id}).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

//Delete a specific expense

module.exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense deleted!" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error!" });
    });
};

// ***** Expense ***** //
