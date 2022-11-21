console.log('hello');



let ui =  new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');
const blogSection = document.querySelector('blog-section')
// Check User Logged in

auth.onAuthStateChanged((user) => {
    if(user){
        login.style.display = "none";
    }else{
        setupLoginButton();
    }

})

// Login Buttons

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectURL){
                return false; 
            }
        },
        signInFlow: "popup",
        signInOptions: [
            
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
            
    })
}

// fetch user written blogs

// first get the user email
const userHandle = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // you can safely access the users properties 

        const lsd = firebase.auth().currentUser.email.split("@")[0];
        console.log(typeof firebase.auth().currentUser.email.split("@")[0]);
    } 
  });

console.log(userHandle())

const myUserId = firebase.auth().currentUser.email.split("@")[0];
console.log(myUserId)
const getUserWrittenBlogs = () => {
    db.collection("blogs").where("author", "===", myUserId)
    .get()
    .then((blogs) => {
        blogs.forEach((blog) => {
            createBlog(blog);
        })
    })
    .catch((error) => {
        console.log("Error getting blogs")
        console.log(error)
    })
}
const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}
