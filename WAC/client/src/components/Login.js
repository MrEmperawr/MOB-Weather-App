import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { postUsers } from './db-connection-functions.js';
import './Login.css';


function Login({ setIsLogin }) {
  const [login, setLogin] = useState();


  useEffect(() => {
    if (login) {
      postUsers(login);
    }
  }, [login])

  const responseFacebook = ({ id, name, email, accessToken}) => {
    setLogin({ id, name, email, accessToken });
    setIsLogin({id});
  }

  return (
    <div className="Login">
      {!login && <FacebookLogin
        appId="2851709378235915"
        fields="name,email,picture"
        icon="fa-facebook"
        callback={responseFacebook} />}
    </div>
  );
}

export default Login;