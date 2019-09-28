const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    
    user_id: String,
    board_id: mongoose.Types.ObjectId,
    amount_paid: Number,
    date_of_receipt: Date
});


expenseSchema.statics.findUserExpensebyId = function(user_ids, split_board_id){
    
    let boardId = mongoose.Types.ObjectId(split_board_id)

    if(!mongoose.Types.ObjectId.isValid(boardId)){
        return new Promise((resolve, reject) => {
            reject(new Error('Invalid Board Id'))
        });
    }

    return this.find({user_id: {$in: user_ids}, board_id: boardId})
    .then((expenses_details) => {
        if(!expenses_details){
            return [];
        }

        let totalAmountOfMember = {};
        totalAmountOfMember = findBoardMemberTotalAmount(user_ids, expenses_details)
        console.log(totalAmountOfMember)
        let response = {
            expense_details :expenses_details,
            total_member_amount : totalAmountOfMember
        }
        return response;
    })
    .catch((err) => {
        return err;
    });
}

const findBoardMemberTotalAmount = (user_ids, expenses_details) => {
    
    let totalAmount = 0;
    let localResponse = {};

    user_ids.forEach((user_id) => {
            
        totalAmount = 0;

        for (let expense of expenses_details){

            if(expense.user_id === user_id){
                 totalAmount += expense.amount_paid;
            }
        }

        localResponse[user_id] = totalAmount;
    })

    return localResponse;
}


const Expenses = mongoose.model('Expenses', expenseSchema);

module.exports =  Expenses;