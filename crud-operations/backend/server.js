const express = require('express');


const app = express();

const db = require('../database/db.js');
const user = require('../module/user.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());



// post route to add a person
app.post('/user', async(req,res) =>{

  try{
    const data = req.body; // assume that the body-parser getting the data from body

    const newUser = new User(data); // newUser is the model that is holding data that comming from the req.body
 
    const response = await newUser.save(); 

    console.log('data saved successfully')
    res.status(200).json({response}); // this will show the status in the network section show there that all the data the is fielled and the post to the server


  }catch(err){
     console.log('error occure', err);
     res.status(500).json({err: 'Internal Servar Error'});
 

  }

})

  app.get('/person', async(req, res)=>{

    try{

      const data = await Person.find();
      console.log('data fetched successfully');

      res.status(200).json(data);

    }catch(err){
     console.log('error occure', err);
     res.status(500).json({err: 'Internal Servar Error'});
  
    }
  })


app.listen(20, ()=>{
    console.log('port listning on 20');
})