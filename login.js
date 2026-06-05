const loginBtn =
document.getElementById("loginBtn");

loginBtn.addEventListener("click",()=>{

const role =
document.getElementById("role").value;

const username =
document.getElementById("username").value;

if(role === "" || username === ""){

alert("Fill all fields");

return;

}

localStorage.setItem(
"role",
role
);

localStorage.setItem(
"username",
username
);

window.location.href =
"dashboard.html";

});