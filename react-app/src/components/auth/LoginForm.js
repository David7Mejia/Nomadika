import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./Login.css";
import '../Landing/Landing.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <div className="container-lo">
        <form onSubmit={onLogin} className="login-form">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          <div className='login-please'>
          Login to continue
          </div>
          <div>
            <label htmlFor="email"></label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className='email-input-lo'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              name="password"
              type="password"
              className='password-input-lo'
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
            <button type="submit" className='login-btn'>Login</button>
        </form>
      </div>
      <div className="landing-right-lo">
        <div className='login-message'>
          <div className='login-welcome'>
          Welcome back!
          </div>
          <div className='small-text-login'>
            Don't have an account?
            <Link to='sign-up'>
              Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
