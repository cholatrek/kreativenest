const express = require('express');
const router = express.Router();
const Landing = require('../model/landing');
const Portfolio = require('../model/portfolio')


router.get('/', (req,res)=>{
    if(req.user){
        console.log('we are here')
        // return next;

        res.render('admin/dashboard',{
            title: 'Admin',
            user: req.user.email
        })
        
    }else{
        res.render('admin/login',{
            title: 'Admin',
           
        })
    }
   
});
// function isAuthentcated(){
//     if(req.user){
//         console.log('we are here')
//         // return next;

//         res.render('posts', {
//             title: 'AdminPosts'
//         } )
        
//     }else{
//         console.log('we re gone')
//         res.redirect('/admin')
//     }
// }

router.get('/dashboard', (req,res)=>{
    if(req.user){
        console.log('we are here')
        // return next;

        res.render('admin/dashboard', {
            title: 'Dashboard',
            user:req.user.email
        } )
        
    }else{
        console.log('we re gone')
        res.redirect('/admin')
    }
})


router.get('/landingpage', (req,res)=>{

    if(req.user){
        console.log('we are here')
        // return next;

        Landing
        .find({})
        .sort({_id : -1})
        .exec((err,landing)=>{

            res.render('admin/landing', {
                title: 'Landing',
                user:req.user.email,
                landing:landing
            } )       
         })

      
        
    }else{
        console.log('we re gone')
        res.redirect('/admin')
    }
   

  
})

// router.get('/portfolio', (req,res)=>{
//     if(req.user){
//         console.log('we are here')
//         // return next;

//         res.render('admin/portfolio', {
//             title: 'Portfolio',
//             user:req.user.email
//         } )
        
//     }else{
//         console.log('we re gone')
//         res.redirect('/admin')
//     }
// })

router.get('/portfolio', (req,res)=>{
    if(req.user){
        console.log('we are here')
        // return next;

        Portfolio
                .find({})
                .sort({_id : -1})
                .exec((err,portfolio)=>{
                    res.render('admin/portfolio', {
                        title: 'Portfolio',
                        user:req.user.email,
                        portfolio:portfolio
                    } )
                })

     
        
    }else{
        console.log('we re gone')
        res.redirect('/admin')
    }
})

router.get('/services', (req,res)=>{
    if(req.user){
        console.log('we are here')
        // return next;

        res.render('admin/services', {
            title: 'Services',
            user:req.user.email
        } )
        
    }else{
        console.log('we re gone')
        res.redirect('/admin')
    }
})

router.get('/subscribers', (req,res)=>{
    if(req.user){
        console.log('we are here')
        // return next;

        res.render('admin/subscribers', {
            title: 'Subscribers',
            user:req.user.email
        } )
        
    }else{
        console.log('we re gone')
        res.redirect('/admin')
    }
})


router.get('/feedbacks', (req,res)=>{
    if(req.user){
        console.log('we are here')
        // return next;

        res.render('admin/feedback', {
            title: 'Subscribers',
            user:req.user.email
        } )
        
    }else{
        console.log('we re gone')
        res.redirect('/admin')
    }
})
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/admin')
})

module.exports= router