const express = require("express");
const router = express.Router();
const admin = require("../fbase.config")
// //GET
// router.get('/', (req, res)=>{
//    res.send("Hello, user");
// });

router.get('/login', (req,res)=>{
   res.render('login.html')
})

// router.get('/logout', (req,res)=>{
//    //logout
//    firebase.auth().signOut().then(function() {
//       // Sign-out successful.
//     }).catch(function(error) {
//       // An error happened.
//     });
//    res.redirect('/')
// })
// router.get('/loggedIn', (req,res)=>{
//    res.render('login.html')
// })

module.exports = router;