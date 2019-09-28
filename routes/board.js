const router = require('express').Router();
const SplitBoard = require('../models/board');
const Expenses = require('../models/expenses');
const User = require('../models/user');

router.post('/board/create-new-board', (req, res) => {
  let board_id = '';
  //check for authenticaiton for the user using a middleware
  //save data into Boards schema

  let new_board = new SplitBoard({
    board_owner_id: req.body.board_owner_id,
    board_title: req.body.board_title,
    board_members_id: req.body.board_members_id,
    date_of_creation: req.body.date_of_creation
  });

  new_board.save()
  .then((board) => {
    if(!board){
      res.status(400).send("New Board could not be save");
    }

    //save owner's expenses in expenses collection
    let new_expense = new Expenses({
      user_id: board.board_owner_id,
      board_id: board._id,
      amount_paid: req.body.amount_paid,
      date_of_receipt: new Date()
    });

    //store board id for future reference
    board_id = board._id;

    //save expense for the owner
    return new_expense.save();
  })
  .then((resp) => {
    if(!resp)
    {
      res.status(400).send("Expenses could not be saved. Removing Board entry.");
      SplitBoard.removeBoardById(board_id);
    }
    res.status(200).send(resp);
  })
  .catch((err) => {
    res.status(500).send(`Some Error occurred: ${err}`);
  });
});

router.get('/board/get-all-board-details', (req, res) => {
  //check user for authentication
  SplitBoard.findBoardsWithEmail(req.body.email)
    .then((response) => {
      res.status(200).send(response);
  })
  .catch(() => {
    res.status(500).send("Some Error occurred");
  })
})


router.get('/board/get-board-details', (req, res) => {
  //check user for authentication
  let board_id = req.body.board_id;
  let boardDetails = {};

  SplitBoard.findBoardDetailsById(board_id)
    .then((board_details) => {
      boardDetails = board_details;
      return Expenses.findUserExpensebyId(board_details.board_members_id, board_id)
    })
    .then((expenses_details) => {

      let response = {
        board_detail: boardDetails,
        expenses_details: expenses_details
      }
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(`Error Occurred : ${err}`);
    });
})

module.exports = router;
