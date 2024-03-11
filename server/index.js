const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://ravimal:ravimal@cluster0.3fm2hn8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.post('/register', (req,res) => {
    EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.json(err))
})

app.post("/login",(req, res)=>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            } else{
                res.json("The password is incorrect")
            }
        } else{
            res.json("No record exiated")
        }
    })
})

app.listen(3001, () => {
    console.log("Server is running")
})