const express = require('express');
const router = express.Router();
const newUserController = require('../controllers/newUserController');
const logInController = require('../controllers/logInController');
const newTransactionController = require('../controllers/transactionController');
const transactionsLogController = require('../controllers/transactionsLogController');
const pdfLogController = require('../controllers/pdfLogController');

router.post("/newUser", newUserController.newUser);
router.post("/logIn", logInController.logIn);
router.post("/newTransaction", newTransactionController.newTransaction);
router.post("/transactionsLog", transactionsLogController.newLog);
router.post("/pdfLog", pdfLogController.pdfLogController);

module.exports = router;
