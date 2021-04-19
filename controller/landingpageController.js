const express = require('express');
const router = express.Router();
const Landing = require('../model/landing');
const multer = require('multer');
const fs = require('fs');
const path = require('path');



const storage = multer.diskStorage({
    destination: './public/uploads/landingPage',
    filename:function(req,file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)  );
    }
});


const upload = multer({
    storage : storage
}).fields([

    {
        name: 'image'}
    
]
    

)



router.post('/landingPage',  (req,res)=>{
    upload(req,res,(err)=>{
        console.log(req.files)
        const landing = new Landing({
            tag : req.body.tag,
            title:req.body.title,
            message:req.body.message,
            action:req.body.action,
            image : req.files.image[0].destination + '/' +  req.files.image[0].filename
        }).save((err,landingpage)=>{
            if(err) return console.error(err);
            console.log('very good')
            res.redirect('/admin/landingpage')
        });
        
    })
})



router.post('/landingpage/:id', (req,res)=>{

    // console.log(req.params.sermonid)
    let items = {}

    items.tag =  req.body.tag
    items.title = req.body.title,
    items.action = req.body.action,
    items.message = req.body.message,
    
    
    console.log(items.title)
    let query  = { _id : req.params.id};
    
   

    Landing
        .update(query, items, function(err){

            if(err){

                console.log(err)

            }else{

                res.redirect('/admin/landingPage')
            }
        });

})

//delete a blog post
router.post('/landingDelete/:id', (req,res)=>{

Landing.findByIdAndRemove({ _id : req.params.id }).then((Landing)=>{
    res.redirect('/admin/landingPage')
});

});  

module.exports = router;