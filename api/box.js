const express = require("express");
const router = express.Router();
const { check,validationResult } = require('express-validator');
const BoxSchemas = require('../schema/Box');
const Str = require('@supercharge/strings')

router.get('/getall',async (req,res) => {
    try{
        let policies = await BoxSchemas.find().sort({ name: 1 });
        res.json(policies);
    }
    catch(err){
        res.json({msg:err.message});
    }
});

router.get('/search',async (req,res) => {
    try{
        let policies = await BoxSchemas.find({

            $and: [
                { $or: [ { unmount: null }, { unmount :"" } ] },
               {"mount" :{$ne:null} }
            ]
        });
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

            let holiday = await BoxSchemas.find();
            
            holiday = new BoxSchemas(
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
            let employer = await BoxSchemas.findOne({"_id"  : req.body.id});
            if (!employer) {
                return res.status(401).json("Event not found");
            }
            await BoxSchemas.deleteOne({"_id"  : req.body.id});
            return res.status(200).json("Event Deleted");
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);


router.get(
    '/removebox',
    async (req,res) => {
        try{
            
            await BoxSchemas.deleteMany({"name"  : "123"});
            return res.status(200).json("Event Deleted");
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);


// router.post('/updatebox',async (req,res) => {
//     try {
//           let policies = await BoxSchemas.find();

//          for (let i = 0; i < policies.length; i++) {
          
        
//             BoxSchemas.findOneAndUpdate(
//                 {name : policies[i].name},
//                 { $set:  {
//                     mount : "",
//                     mountid :"",
//                     unmount :"",
//                     rsid : "",
//                     position: "",
//                     unmountid :""
                    
//                         }},
//                 { new: true }
//               )
//                 .then(templates =>
//                     {
                       
//                 })
                
        
            
 
// }


     
       
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500);
//     }
// });


router.post('/update',async (req,res) => {
    try {
        let {id} = req.query;
        let employer = await BoxSchemas.findById(id);
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
    BoxSchemas.findById(id).then(result=>
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
    BoxSchemas.find({"cid" : id}).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });

 router.get('/getsid',(req,res,next)=>{
    let {id}=req.query;
    BoxSchemas.find({"sid" : id}).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });


 router.get('/getdriver',(req,res,next)=>{
    let {id}=req.query;
    BoxSchemas.find({$or: [{
        "pickedid" : id  

    },
    { "deliverid" : id}
    ]
         }).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });


 router.get('/getcity',(req,res,next)=>{
    let {id}=req.query;
    BoxSchemas.find({$and: [
        { $or: [ { unmount: null }, { unmount :"" } ] },
        { city :id }  ,{"mount" :{$ne:null} } ,{"mount" :{$ne:""} }
    ]}).then(result=>
         {
            console.log(result.length);
            res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });
 

 router.post('/getcbox',(req,res,next)=>{
    BoxSchemas.find({"rsid" : req.body.rsid  }).then(result=>
         {res.status(200).json(result)
     }).catch(error=>{
                 console.log(error);
                     res.status(500).json(
                         {error:error}
                     )
     })
 });
 

 
 router.post(
    '/addhistory',
    async (req,res) => {
        try{
            
            let employer = await BoxSchemas.findOne({"_id"  : req.body.bid});
            if (!employer) {
                return res.status(401).json("Technicial not found");
            }
            const referc = Str.random(5)  

            employer.history.push({
                "sid"  : referc,
               "mid" :req.body.mid,
               "date": req.body.date,
               "status" :req.body.status,
              
            
            });
            await employer.save();
            res.json(employer);
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : error.message});
        }
    }
);
 
 
module.exports = router;