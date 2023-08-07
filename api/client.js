const express = require("express");
const router = express.Router();
const { check,validationResult } = require('express-validator');
const ClientSchemas = require('../schema/Client');
const Str = require('@supercharge/strings')

router.get('/getall',async (req,res) => {
    try{
        let policies = await ClientSchemas.find();
        res.json(policies);
    }
    catch(err){
        res.json({msg:err.message});
    }
});

router.post(
    '/login',
    async (req,res) => {
        try {
            console.log(req.body);
            const errors = validationResult(req);
            let employer = await ClientSchemas.findOne({"email"  : req.body.email})
            console.log(employer);
            if(!errors.isEmpty()){
                return res.status(401).json({errors : errors.array})
            }
            if(!employer){
                return res.status(401).json("Not Found");
            }else{

                if(employer.password==req.body.password){
                    res.status(200).json(employer);

                }else{
                    return res.status(401).json("Password Not Match");

                }
             
            }
            
           
       } catch (error){
            console.log(error.message);
            return res.status(500);
       }
    }
);

router.post(
    '/add',
    async (req,res) => {
        try{

            let policies = await ClientSchemas.find();
            console.log(policies.length);
            holiday = new ClientSchemas(
               req.body
                );
            await holiday.save();
            res.json(holiday);  
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : "Server Error....."});
        }
    }
);

router.post(
    '/remove',
    async (req,res) => {
        try{
            let employer = await ClientSchemas.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Event not found");
            }
            await ClientSchemas.deleteOne({"_id"  : req.body.id});
            return res.status(200).json("Event Deleted");
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);

router.post('/update',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await ClientSchemas.findById(id);
        if (!employer) {
            return res.status(401).json("Event not found");
        }
        // let obj = {
        //     status : req.body.status
        // }
        Object.assign(employer, req.body);
        await employer.save();
        res.json(employer);
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.get('/details',(req,res,next)=>{
    let {id}=req.query;
    ClientSchemas.findById(id).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });

 
 
module.exports = router;