const express = require('express');
const router = express.Router();
const Portfolio = require('../model/portfolio');
const multer = require ('multer');
const path = require('path');
const fs = require('fs');

 // image from the video, date, title, eventdetails,link,youtubelink, next portfolio


 const storage = multer.diskStorage({
  destination: './public/uploads/portfolio',
  filename:function(req,file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)  );
  }
});

const upload = multer({
  storage : storage
}).fields([

  { name: 'portfolioImage' }
  

]
  
)


router.post('/portfolio', (req,res)=>{
  upload(req,res,(err)=>{
     
          if(err){
              res.send(err);
          }else{
      

      console.log(req.files)
      const portfolio = new Portfolio({
           
      title : req.body.title,
      eventDetails : req.body.eventDetails,
      instagramLink:req.body.instagramLink, 
      datePosted:req.body.datePosted,
      youtubeLink:req.body.youtubeLink,
      portfolioImage:req.files.portfolioImage[0].destination + '/' +  req.files.portfolioImage[0].filename
      }).save((err,portfolio)=>{
        if(err){
          console.log(err)
        }else{
          res.redirect('/admin/portfolio')
        }

          
      })
  }

} )

})


router.post('/portfolio/:id', (req,res)=>{

  // console.log(req.params.sermonid)
  let items = {}
  
      items.title = req.body.title,
      items.eventDetails = req.body.eventDetails,
      items.instagramLink=req.body.instagramLink, 
      items.datePosted=req.body.datePosted,
      items.youtubeLink=req.body.youtubeLink,
  
  console.log(items.title)
  let query  = { _id : req.params.id};
  
 

  Portfolio
      .update(query, items, function(err){

          if(err){

              console.log(err)

          }else{

              res.redirect('/admin/portfolio')
          }
      });

})

//delete a blog post
router.post('/portfolioDelete/:id', (req,res)=>{

Portfolio.findByIdAndRemove({ _id : req.params.id }).then((Portfolio)=>{
  res.redirect('/admin/portfolio')
});

});  



module.exports = router;