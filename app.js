const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');

const port = 5000;
app.set('port',port);

mongoose.connect('mongodb://localhost:27017/Try');
mongoose.connection.on('connected', () =>{
    console.log("database is connected now");
})

app.use(bodyparser.json());

// const users = [
//     {id:1,name:'rahul'},
//     {id:2,name:'ram'},
//     {id:3,name:'shyam'}
// ]

app.post('/create', (req,res) => {

    const user = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email
    })

    user.save().then(data => {
       if(data){
            res.send({
                status:200,
                message:'data created successfully',
                user:user
            })
        }
    }).catch(err => {
        res.send({
            status:500,
            message:'data not created' + err,
        })
    })

})

app.get('/read',(req,res) =>{

    var pageno = parseInt(req.query.pageno)
    var size = parseInt(req.query.size)

    if(pageno < 0 || pageno === 0 ){
        response = {"error":true, message : "should start with 1"};
            return res.json(response);
        }
    const userQuery = User.find();

    if(pageno > 0 && size) {
       userQuery.skip(size*(pageno - 1));
    }    

    userQuery.then(data => {
        res.send({
            status:200,
            message:'data fetched successfully',
            users:data
        })
    }).catch(err =>{
        res.send({
            status:500,
            message:'error found',
        })
    })
})
app.delete('/delete/:id',(req,res) =>{

    User.deleteOne({_id : req.params.id}).then(result =>{
        res.send({
            status:200,
            message:'user deleted successfully'
        })
    })
})
module.exports = app;