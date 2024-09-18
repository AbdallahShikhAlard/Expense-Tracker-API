const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const UserRouter = require('./routers/UserRouter')
const ExpensesRouter = require('./routers/ExpensesRouter')

dotenv.config()
const app = express()
const port = 8080 
app.use(express.json())
mongoose.connect(process.env.DATABASE_URI)

const db = mongoose.connection
db.on('error',()=>{console.log("conection error")})
db.once('open',()=>{console.log("conected to DB")})

app.use(UserRouter)
app.use(ExpensesRouter)
const oneWeekAgo = new Date();  
        
console.log(`now${oneWeekAgo} , week ago ${oneWeekAgo.getDate() - 7}`)
app.listen(port , ()=>{console.log("server running on port 8080!")})