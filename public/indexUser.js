let currentUser = getCurrentUserOnAuthStateChanged();
let token;
async function getCurrentUserOnAuthStateChanged(){
   await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      // User is signed in.
      console.log("user!")
      console.log("user:",user)
      document.getElementById('username').innerText=`Hi ${user.displayName}`
      //   console.log(user.displayName)
      //   console.log(user.email)
      //   console.log(user.photoUrl)
      //   console.log(user.emailVerified)
      //   console.log(user.uid)
      
      document.getElementById('logout').style = 'display:show';
      token = user.getIdToken()
      
      return user;
      } else {
      // No user is signed in.
      console.log("no user!")
      
      document.getElementById('signin').style = 'display:show';
      //   window.location = "/user/login"
      }
   });
}

document
   .getElementById("logout")
   .addEventListener("click",(e)=>{
      e.preventDefault();
      console.log("clicked logout...!")
      firebase.auth().signOut().then(()=>{
         console.log("Successfully singed out-!")
         window.location = "/"
      }).catch((err)=>{
         console.log("Err...!", err)
      })
   })

//signup button...
document
.getElementById("signin")
.addEventListener("click",(e)=>{
   e.preventDefault();
   console.log("clicked signup...!")

   window.location='/user/login';
})