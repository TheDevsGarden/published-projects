//import
//import {db} from '/firebase.js'
//const db = firebase.firestore();

// title and article
const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

// buttons
const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

// Banner event listener 

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner"); 
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})

// upload image function 

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}

// some thing I don't understand

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}

// Make PUBLISH function work

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if(articleField.value.length && blogTitleField.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        //console.log(blogTitle);
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        console.log(docName);
        let date = new Date(); // for published at info

        //access firstore with db variable;
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
            author: auth.currentUser.email.toLowerCase().split("@")[0] //returns ["example","gmail.com" ]
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
    }
})


// check if user is logged in or not

auth.onAuthStateChanged((user)=> {
    if(!user){
        location.replace("/admin"); //redirects to admin route if no one logged in
    }
})