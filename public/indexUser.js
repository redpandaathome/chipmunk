var currentUser = getCurrentUserOnAuthStateChanged();

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
      
      return user;
      } else {
      // No user is signed in.
      console.log("no user!")
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

//login button
document
.getElementById("login")
.addEventListener("click",(e)=>{
   e.preventDefault();
   console.log("clicked login...!")

   window.location='/user/login';
})

//signup button...
document
.getElementById("signup")
.addEventListener("click",(e)=>{
   e.preventDefault();
   console.log("clicked signup...!")

   window.location='/user/login';
})