const express = require("express")
const router= express.Router();
const admin = require("../fbase.config")

//GET
router.get('/', (req, res) => {
   
   res.render('index', {title:'Chipmunk🐿'});
});

//Get nunjucks test
router.get('/njx', (req,res)=>{
   res.render('main')
})

//Get nunjucks test
router.get('/njx2', (req,res)=>{
   res.render('body', {title:'Chip Chip Chip 🐿'})
})

// router.get('/login', (req,res)=>{
//    res.render('login.html')
// })

module.exports = router;