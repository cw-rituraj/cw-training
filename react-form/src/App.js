import "./styles.css";
import { useState, useRef } from "react";

export default function App() {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [popUp, SetPopUp] = useState("");

  const [usernameStatus, SetUsernameStatus] = useState("default");
  const [emailStatus, SetEmailStatus] = useState("default");
  const [PasswordStatus, SetPasswordStatus] = useState("default");
  const [confirmPasswordStatus, SetConfirmPasswordStatus] = useState("default");
  const PasswordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (check()) {
      SetPopUp(true);
    }
  };

  const check = () => {
    let isValid = true;

    if (username.length <= 3 || username.length >= 25) {
      SetUsernameStatus("false");
      isValid = false;
    } else if (username.length > 3 && username.length < 25) {
      SetUsernameStatus("true");
    }

    if (validateEmail()) {
      SetEmailStatus("true");
    } else {
      SetEmailStatus("false");
      isValid = false;
    }

    if (validatePassword()) {
      SetPasswordStatus("true");
    } else {
      SetPasswordStatus("false");
      isValid = false;
    }

    if (password !== confirmPassword) {
      SetConfirmPasswordStatus("false");
      isValid = false;
    } else if (password === confirmPassword) {
      SetConfirmPasswordStatus("true");
    }

    return isValid;
  };

  const handlePopUpClose = (e) => {
    SetPopUp(false);
    window.location.reload();
  };

  const handleTogglePassword = (e) => {
    console.log(e.target.src);
    if (
      e.target.src ===
      "https://img.icons8.com/material-two-tone/24/000000/hide.png"
    ) {
      e.target.src =
        "https://img.icons8.com/material-two-tone/24/000000/visible.png";
      PasswordRef.current.type = "text";
    } else {
      e.target.src =
        "https://img.icons8.com/material-two-tone/24/000000/hide.png";
      PasswordRef.current.type = "password";
    }
  };

  const validateEmail = () => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePassword = () => {
    return password.match(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$/
    );
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div>
          <label for="">Username:</label>
          <input
            id={
              usernameStatus === "default"
                ? ""
                : usernameStatus === "true"
                ? "right"
                : "wrong"
            }
            type="username"
            onChange={(e) => SetUsername(e.target.value)}
            required
          />
          <p
            className="errormsg"
            id="nameerrormsg"
            style={{ display: usernameStatus === "false" ? "inline" : "none" }}
          >
            Username must be between 3 and 25 characters.
          </p>
        </div>
        <div>
          <label for="">Email:</label>{" "}
          <input
            id={
              emailStatus === "default"
                ? ""
                : emailStatus === "true"
                ? "right"
                : "wrong"
            }
            type="email"
            onChange={(e) => SetEmail(e.target.value)}
            required
          />
          <p
            className="errormsg"
            id="emailerrormsg"
            style={{ display: emailStatus === "false" ? "inline" : "none" }}
          >
            Please enter valid email.
          </p>
        </div>
        <div className="pass">
          <label for="">Password:</label>
          <input
            id={
              PasswordStatus === "default"
                ? ""
                : PasswordStatus === "true"
                ? "right"
                : "wrong"
            }
            type="password"
            onChange={(e) => SetPassword(e.target.value)}
            ref={PasswordRef}
            required
          />
          <p
            className="errormsg"
            id="passworderrormsg"
            style={{
              display: PasswordStatus === "false" ? "inline" : "none"
            }}
          >
            Password must has at least eight characters that include 1 lowercase
            character, 1 uppercase character, 1 number, and 1 special character
            in (!@#$%^&*)
          </p>
          <img
            id="togglePassword"
            src="https://img.icons8.com/material-two-tone/24/000000/hide.png"
            alt="togglePasswordImage"
            onClick={handleTogglePassword}
          />
        </div>
        <div>
          <label for="">Confirm Password:</label>
          <input
            id={
              confirmPasswordStatus === "default"
                ? ""
                : confirmPasswordStatus === "true"
                ? "right"
                : "wrong"
            }
            type="password"
            onChange={(e) => SetConfirmPassword(e.target.value)}
            required
          />
          <p
            className="errormsg"
            id="cpassworderrormsg"
            style={{
              display: confirmPasswordStatus === "false" ? "inline" : "none"
            }}
          >
            Please enter password again.
          </p>
        </div>

        <button id="submit" type="submit">
          SIGN UP
        </button>
      </form>
      <div
        className="signup-popup"
        style={{ display: popUp === true ? "flex" : "none" }}
      >
        You are signed up.
        <i className="close" onClick={handlePopUpClose}>
          ❌
        </i>
      </div>
    </>
  );
}
