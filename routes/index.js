const express = require("express")

const router= express.Router();

//GET
router.get('/', (req, res) => {
   // res.send("Hello, baby chipmunk 🐿");
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

module.exports = router;