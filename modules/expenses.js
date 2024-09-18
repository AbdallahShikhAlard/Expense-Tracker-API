const mongoose = require('mongoose')

const ExpensesSchema = mongoose.Schema({
    userid : {type : mongoose.Schema.Types.ObjectId ,required: true},
    expense :{ type:String , required:true },
    date : { type:Date },
    title : { type:String ,required:true}
})

ExpensesSchema.pre('save', async function (next) {
this.date = Date();    
})

ExpensesSchema.statics.getExpensesByDateRange = async function (userid, startDate, endDate) {  
    return await this.find({  
        userid: userid,  
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }  
    });  
}; 

const Expense = mongoose.model('expenses' , ExpensesSchema)
module.exports = Expense