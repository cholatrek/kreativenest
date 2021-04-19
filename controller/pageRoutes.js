const express  = require('express');
const router = express.Router();
const Landing  = require('../model/landing')
const Portfolio = require('../model/portfolio')

// Here is the router to the homepage of the website
router.get('/', (req,res)=>{
    Landing.
            find({})
            .sort({_id : -1})
            .exec((err,landing)=>{

                Portfolio
                    .find({})
                    .sort({_id:-1})
                    .exec((err, portfolio)=>{
                        res.render('index', {
                            title : 'HomePage',
                            landing : landing,
                            portfolio:portfolio
                        })
                    })
            
            })
   
});




// Here is the router to the about of the website
router.get('/about', (req,res)=>{
    res.render('about', {
        title : 'About'
    })
})


// Here is the router to the services of the website
router.get('/services', (req,res)=>{
    res.render('services', {
        title : 'Services'
    })
})

// Here is the router to the services of the website
router.get('/ourwork', (req,res)=>{
    Portfolio
        .find({})
        .sort({ _id  : -1 })
        .exec((err,portfolio)=>{
            res.render('work', {
                title : 'Our Work',
                portfolio:portfolio
            })
        })
    
})

// Here is the router to the contact of the website
router.get('/contact', (req,res)=>{
    res.render('contact', {
        title : 'Contact',
        success:req.flash('success')
    })
});

router.get('/portfolio/:id', (req,res)=>{
    // res.send(req.params.id)
    Portfolio
    .findOne({ _id : req.params.id})
    .exec((err,portfolio)=>{

        Portfolio
            .find({})
            .sort({_id:-1})
            .exec((err,allPortfolio)=>{
                res.render('singlePortfolio', {
                    title : 'Single Portfolio',
                    portfolio:portfolio,
                    allPortfolio:allPortfolio
                }) 
            })
     
    })

})



module.exports = router;