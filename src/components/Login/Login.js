import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App' 
import { useHistory, useLocation } from 'react-router';
import './Login.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


//firebase initialize
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function Login() {
  //context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  //google provider
  var provider = new firebase.auth.GoogleAuthProvider();
  

  //history and location hooks
  let history = useHistory();
  let location = useLocation();
  const  { from } = location.state || { from: { pathname: "/" } };

  //email and pass login
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    error : '',
    ok : '',
    success : false
  })

  //google sign in
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const {displayName,email} = result.user;
        const signedInUser = {name : displayName, email :email};
        setLoggedInUser(signedInUser);
        setUser(user);
        history.replace(from)

      }).catch((error) => {

        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

  }
 
  
  return (
    <div className="text-center">
        <button className="btn btn-secondary pl-4 pr-4 mt-5" onClick={handleSignIn}><FontAwesomeIcon className="mr-3" icon={faGoogle}></FontAwesomeIcon>Google Sign in</button> <br /> 
    </div>
  );
}

export default Login;
