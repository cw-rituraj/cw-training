const email = document.querySelector("#email");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmpassword = document.querySelector("#confirm-password");
const submit = document.querySelector("#submit");
const togglePassword = document.querySelector("#togglePassword");
const signup_popup = document.querySelector(".signup-popup");
const form = document.querySelector(".form-container");
const closed = document.querySelector(".close");

const usernamemsg = document.querySelector("#nameerrormsg");
const passwordmsg = document.querySelector("#passworderrormsg");
const confirmpasswordmsg = document.querySelector("#cpassworderrormsg");
const emailmsg = document.querySelector("#emailerrormsg");

const check = () => {
  let isValid = true;

  if (username.value.length < 3 || username.value.length > 25) {
    usernamemsg.style.display = "inline";
    username.setAttribute("id", "wrong");
    isValid = false;
  } else if (username.value.length > 2 && username.value.length < 26) {
    usernamemsg.style.display = "none";
    username.setAttribute("id", "right");
  }

  if (validateEmail(email.value)) {
    email.setAttribute("id", "right");
    emailmsg.style.display = "none";
  } else {
    email.setAttribute("id", "wrong");
    emailmsg.style.display = "inline";
    isValid = false;
  }

  if (validatePassword(password.value)) {
    password.setAttribute("id", "right");
    passwordmsg.style.display = "none";
  } else {
    password.setAttribute("id", "wrong");
    passwordmsg.style.display = "inline";
    isValid = false;
  }

  if (password.value != confirmpassword.value) {
    passwordmsg.style.display = "inline";
    confirmpasswordmsg.style.display = "inline";
    confirmpassword.setAttribute("id", "wrong");
    isValid = false;
  } else if (password.value != confirmpassword.value) {
    confirmpasswordmsg.style.display = "none";
    confirmpassword.setAttribute("id", "right");
  }

  return isValid;
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatePassword = (password) => {
  return password.match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$/
  );
};

togglePassword.addEventListener("click", (e) => {
  if (
    togglePassword.attributes.src.nodeValue ==
    "https://img.icons8.com/material-two-tone/24/000000/hide.png"
  ) {
    togglePassword.attributes.src.nodeValue =
      "https://img.icons8.com/material-two-tone/24/000000/visible.png";
    password.type = "text";
  } else {
    togglePassword.attributes.src.nodeValue =
      "https://img.icons8.com/material-two-tone/24/000000/hide.png";
    password.type = "password";
  }
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (check()) {
    signup_popup.style.display = "flex";
    form.style.opacity = "0.5";
    // alert("You are signed up.");
  }
});

closed.addEventListener("click", (e) => {
  signup_popup.style.display = "none";
  location.reload();
});
