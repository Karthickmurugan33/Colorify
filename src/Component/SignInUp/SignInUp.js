import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionTaker } from "../../store/redux";
import { useHistory } from "react-router-dom";
import style from "./SignInUp.module.css";

// import axios from "axios";
const SignInUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [enterEmail, setEnterdEmail] = useState("");
  const [enterPassword, setenterPassword] = useState("");
  const [isValid, setisValid] = useState(true);

  const emailHandler = (event) => {
    setEnterdEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setenterPassword(event.target.value);
  };

  const signUpHanlder = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvGJGVT3JUbXs3hpbusaZgNXOiybfupik",
        {
          email: enterEmail,
          password: enterPassword,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response);
        const uId = response.data.localId;
        localStorage.setItem("user", uId);
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        alert(error.response.data.error.message);
      });
  };
  const signInHandler = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvGJGVT3JUbXs3hpbusaZgNXOiybfupik",
        {
          email: enterEmail,
          password: enterPassword,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response);
        const uId = response.data.localId;
        localStorage.setItem("user", uId);
        history.replace("/home");
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        alert(error.response.data.error.message);
      });
  };

  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <div>
          <p>COLORIFY</p>
        </div>
        <div className={style.form} >
          <input type="email" placeholder="Email" id="email" onChange={emailHandler} />

          <input type="password" placeholder="Password" id="password" onChange={passwordHandler} />
          <button onClick={signUpHanlder}>Sign Up</button>
          <button onClick={signInHandler}>Sign In</button>
        </div>
        <div className={style.action_sign}>

        </div>
      </div>
    </div>
  );
};

export default SignInUp;
