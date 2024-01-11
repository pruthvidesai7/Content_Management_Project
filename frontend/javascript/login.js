const showPassword = () => {
    var pass = document.getElementById("password");
    var eye1 = document.getElementById("eye1");
    var eye2 = document.getElementById("eye2");

    if(pass.type === 'password'){
        pass.type = 'text';
        eye1.style.display = 'none';
        eye2.style.display = 'block';
    }
    else{
        pass.type = 'password';
        eye1.style.display = 'block';
        eye2.style.display = 'none';
    }
};

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

const reqFieldsValidation = () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(email === '' || password === ''){
        showToast("error", "Please fill email id and password");
    }else{
        return true;
    }
};

const createUrl = (uri) => {
    return 'http://localhost:8080/cms'+uri;
}

const login = () => {
    debugger;
    if(reqFieldsValidation()){
        var username = document.getElementById("email");
        var pass = document.getElementById("password");
        const email = username.value;
        const password = pass.value;
        const body = JSON.stringify({email, password});
        const url = createUrl('/auth/login');

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            debugger;
        if (this.readyState == 4 && this.status == 200) {
            debugger;
            var response = JSON.parse(this.responseText);
            console.log(response);
            if(response.userId === -1){
                showToast("error", response.msg);
            }else if(response.userId === 0){
                showToast("error", response.msg);
            }else{
                localStorage.setItem("blogs_token", response.token);
                localStorage.setItem("user_id", response.userId);
                window.location.href = 'dashboard.html';
            }  
        }
        else if(this.readyState === 4 && this.status === 401){
            debugger;
            showToast("error", "Wrong email id or password");
            return;
        }else if(this.readyState === 4 && this.status === 0){
            debugger;
            showToast("error", "Server not responding.<br>Please try again later.");
        }
        };
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(body);
    }
};

// ================================

const forgotPassword = () => {
    const email = document.getElementById("forget-email");  //add id to input box
    const emailId = email.value;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if(emailId.match(emailRegex)){
        email.value = "";
        //call the api to send temporary password via email
        showToast("success", "Please check your email for temporary password");
    }else{
        showToast("error", "Invalid email id");
    }
};

const home = () => {
    window.location.href = "../index.html";
};
