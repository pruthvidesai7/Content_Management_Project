const showToast = (type, message) => {
    debugger;
    var toast = document.getElementById('toast');
    toast.classList.add('show');
    toast.style.display = "block";
    if(type === "success"){
        toast.style.backgroundColor = "#07bc0c";
    }else if(type === "error"){
        toast.style.backgroundColor = "#e74c3c";
    }else if(type === "warning"){
        toast.style.backgroundColor = "#f1c40f";
    }
    toast.innerHTML = `${message}`;

    setTimeout(function() {
        toast.style.display = "none";
        toast.classList.remove('show');
    }, 3000);
};

const subscribe = () => {
    var email = document.getElementById('email');
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
    if(email.value.match(emailRegex)){
        email.value = "";
        showToast("success", "Subscribed successfully. <br>Please check your email for further updates");
    }else{
        showToast("error", "Invalid email id");
    }
};

// =====================================

const USER_ID = localStorage.getItem("user_id");
const TOKEN = localStorage.getItem("blogs_token");

const verifyToken = () => {
    //call the api to verify the token
    
    return false;
};

if(verifyToken()){
    const nav_options = document.getElementById("nav-options");  //give id field in va-options class
    nav_options.innerHTML = "";
}

const writeBlog = () => {
    if(verifyToken()){
        window.location.href = "../html/writeblog.html";
    }else{
        showToast("error", "Please login first");
    }
};

const readBlogs = () => {
    window.location.href = "../html/readblogs.html";
};


// ======================================

const createUrl = (uri) => {
    return 'http://localhost:8080/cms'+uri;
};

const getTopBlogs = () => {
    const url = createUrl('/blogs/gettopblogs');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        createBlogCards(response);
      }
    };
    xhr.open('GET', url);
    xhr.send();
};

getTopBlogs();

const createBlogCards = (data) => {
    var top_blogs = document.getElementById('top-blogs');   //give id = "top-blogs" in html
    top_blogs.innerHTML = "";
    for(var i=0; i<data.length; i++){
        // const inputDate = new Date(data[i].updated_timestamp);
        // const options = { month: 'short', day: '2-digit', year: 'numeric' };
        // const outputDateString = inputDate.toLocaleDateString('en-US', options);
        var card = 
        `<div class="blog" onclick="openBlog(${data[i].id})">
            <img src="./images/background.png" alt="">
            <h3>${data[i].title}</h3>
            <p class="author">- By ${data[i].author}</p>
            <p>${data[i].content}...</p>
        </div>`;
        top_blogs.innerHTML += card;
    }
};

const openBlog = (id) => {
    debugger;
    console.log(id);
    sessionStorage.setItem("blog_id", id);
    window.location.href = "./html/blogs.html";
};
