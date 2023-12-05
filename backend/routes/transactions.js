const router = require("express").Router()
const {addIncome, getIncomes, deleteIncome, addExpense, getExpenses, deleteExpense, registerUser, loginUser} = require("../controllers/transactions");


router.post("/addIncome", addIncome);
router.get("/getIncomes/:id", getIncomes);
router.delete("/deleteIncome/:id", deleteIncome);

router.post("/addExpense", addExpense);
router.get("/getExpenses/:id", getExpenses);
router.delete("/deleteExpense/:id", deleteExpense);

router.post("/registerUser", registerUser); 
router.post("/loginUser", loginUser);
module.exports = router;