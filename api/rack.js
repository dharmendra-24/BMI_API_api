const express = require("express");
const router = express.Router();
const { check,validationResult } = require('express-validator');
const RackSchemas = require('../schema/Rack');
const Str = require('@supercharge/strings')

router.get('/getall',async (req,res) => {
    try{
        let policies = await RackSchemas.find({"active" : true});
        res.json(policies);
    }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/all',async (req,res) => {
    try{
        let policies = await RackSchemas.find();
        res.json(policies);
    }
    catch(err){
        res.json({msg:err.message});
    }
});

router.post(
    '/add',
    async (req,res) => {
        try{

            let policies = await RackSchemas.find();
            console.log(policies.length);
            holiday = new RackSchemas(
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
            let employer = await RackSchemas.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Event not found");
            }
            await RackSchemas.deleteOne({"_id"  : req.body.id});
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
        let employer = await RackSchemas.findById(id);
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
    RackSchemas.findById(id).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });

 router.get('/getid',(req,res,next)=>{
    let {id}=req.query;
    RackSchemas.find({"cid" : id , "active" : true} ).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });


 router.post('/getc',(req,res,next)=>{

    RackSchemas.find({"cid" : req.body.cid , "active"  : true}).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })

 });

 

 router.post(
    '/addstory',
    async (req,res) => {
        try{
            let {id}=req.query;
            let employer = await RackSchemas.findById(id);
            if (!employer) {
                return res.status(401).json("Technicial not found");
            }
            const referc = Str.random(5)  

            employer.story.push({
                "sid"  : referc,
                "box"  : req.body.box,
                "cap" : req.body.cap,
                "name" : req.body.name,
            });
            await employer.save();
            res.json(employer);
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);

router.post(
    '/deletestory',
    async (req,res) => {
        try{
            let employer = await RackSchemas.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Work not found");
            }
            RackSchemas.findOneAndUpdate(
                { _id: req.body.id},
                { $pull: { story: { sid: req.body.sid } } },
                { new: true }
              )
                .then(templates =>
                    {
                        res.status(200).json(templates)
                })
                .catch(err =>  {
                    res.status(200).json(err)
            });
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);

router.post('/updatestory',async (req,res) => {
    try {
        let employer = await RackSchemas.findOne({"_id"  : req.body.id});
        if (!employer) {
            return res.status(401).json("Work not found");
        }
        RackSchemas.findOneAndUpdate(
            { _id: req.body.id , "story.sid": req.body.sid},
            { $set: { "story.$.box": req.body.box } 
        },
        { new: true }
          )
            .then(templates =>
                {
                    res.status(200).json(templates)
            })
            .catch(err =>  {
                res.status(200).json(err)
        });
        
       
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.post('/updatestoryname',async (req,res) => {
    try {
        let employer = await RackSchemas.findOne({"_id"  : req.body.id});
        if (!employer) {
            return res.status(401).json("Work not found");
        }
        RackSchemas.findOneAndUpdate(
            { _id: req.body.id , "story.sid": req.body.sid},
            { $set: { "story.$.name": req.body.name } 
        },
        { new: true }
          )
            .then(templates =>
                {
                    res.status(200).json(templates)
            })
            .catch(err =>  {
                res.status(200).json(err)
        });
        
       
    } catch (error) {
        console.log(error.message);
        return res.status(500);
    }
});

router.get('/getcity',(req,res,next)=>{
    let {id}=req.query;
    RackSchemas.find({"city" : id}).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });

 
module.exports = router;