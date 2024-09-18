const express = require('express')
const router = express.Router()
const Expense = require('../modules/expenses')
const authenticateToken = require('../middleware/authenticateToken')
const { model } = require('mongoose')


//get past week expenses
router.get('/lastWeek' , authenticateToken , async (req , res) => {
    try {
        const oneWeekAgo = new Date();  
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        const expenses = await Expense.find({
            date:{ $gte: oneWeekAgo },
            userid:{$eq:req.user.id}
        })
        res.status(200).send(expenses)
    } catch (err) {
        res.status(401).send({messge :err.messge})
    }
})

//get total expenses in last week
router.get('/lwe' , authenticateToken , async (req , res) => {
    try {
        const oneWeekAgo = new Date();  
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        const expenses = await Expense.find({
            date:{ $gte: oneWeekAgo },
            userid:{$eq:req.user.id}
        }) 
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.expense), 0);
        res.status(200).json({total})
    } catch (err) {
        res.status(401).json({messge: err.messge})
    }
})

//git expenses by coustom date
router.get('/coustom', authenticateToken ,async (req ,res) => {
    try {
        const {start , end} = req.body
        const expenses = await Expense.getExpensesByDateRange(req.user.id , start , end)
        res.status(200).json(expenses)
    } catch (err) {
        res.status(500).send(err.messge)
    }
})
//add expenses
router.post('/' , authenticateToken , async (req , res)=>{
    const {title ,  expense} = req.body
    const
    expense1 = new Expense({userid : req.user.id , title , expense})
    try {
        expense1.save()
        res.status(200).send(expense1)
    } catch (err) {
        res.json({messge : err.messge})
    }
})

// Update an expense  
router.put('/expense/:id', authenticateToken, async (req, res) => {  
    const { expense } = req.body;  
    try {  
      const newExpenses = await Expense.findByIdAndUpdate(req.params.id, { expense } , {new:true});  
      if (!newExpenses) return res.sendStatus(401);  
      res.json(newExpenses);  
    } catch (err) {  
      res.status(400).send(err);  
    }  
});
// Delete expense  
router.delete('/expense/:id', authenticateToken, async (req, res) => {  
    try {  
      const expense = await Expense.findByIdAndDelete({_id : req.params.id});  
      if (!expense) return res.sendStatus(404);  
      res.sendStatus(204);  
    } catch (err) {  
      res.status(400).send(err);  
    }  
});  

module.exports = router