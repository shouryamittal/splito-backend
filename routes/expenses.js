const router = require('express').Router();
const Expenses = require('../models/expenses');

router.post('/expense/add-user-contribution', (req, res) => {

    let new_expense = new Expenses({
        user_id: req.body.user_id,
        board_id: req.body.board_id,
        amount_paid: req.body.amount_paid,
        date_of_receipt: new Date()
    });

    new_expense.save()
        .then((response) => {
            if(!response){
                res.status(400).send('Could not Save expense');
            }
            res.status(200).send('Expense saved successfully.');
        })
        .catch((err) => {
            res.status(500).send(`${err}`);
        });
});

module.exports = router;