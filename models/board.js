const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const splitBoardSchema = new Schema({

    board_owner_id : {
      type: String, 
      required: true
    },

    board_title : {
      type: String,
      required: true,
      default: "New Board"
    },

    board_members_id : {
      type: [String],
      required:  true
    },

    date_of_creation:{
      type: Date,
      defualt : Date.now
    }

});

splitBoardSchema.statics.findBoardsWithEmail = function(userEmail) {

    return this.find({board_owner_id: userEmail})
      .then((resp) => {    
          if(resp.length)
          {
            return resp;
          }
          else{
            return [];
          }    
      })
      .catch((err)=> {
        return err;
      });
}

splitBoardSchema.statics.removeBoardById = function(boardId){
    return this.findOneAndRemove({_id: boardId})
      .then((response) => {
          if(!response)
          {
            return {};
          }
          else{
            return response;
          }
      })
      .catch((err) => {
        return err;
      });
}

splitBoardSchema.statics.findBoardDetailsById = function(board_id) {

  return this.findOne({_id: board_id})
          .then((response) => {
              if(!response){
                return {};
              }
              return response;
          })
          .catch((err) => {
              return err;
          });
}

const SplitBoard = mongoose.model('SplitBoard', splitBoardSchema);

module.exports = SplitBoard;
