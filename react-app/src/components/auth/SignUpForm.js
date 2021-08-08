import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrors(['Passwords do not match'])
    } else {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-container">
      <div className="container-su">
        <form onSubmit={onSignUp} className="signup-form">
          {errors.map((error, ind) => (
            <div key={ind}>{error}
            {console.log(error)}
            </div>
          ))}
          <div className="signup-please">Sign up</div>
          <div>
            <label></label>
            <input
              placeholder="Username"
              type="text"
              name="username"
              className="su-input"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              className="su-input"
              placeholder="Email"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              className="su-input"
              placeholder="Password"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label></label>
            <input
              className="su-input"
              placeholder="Repeat Password"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type="submit" className="su-form-button">
            Sign Up
          </button>
        </form>
      </div>
      <div className="landing-right-su">
        <div className="login-message">
          <div className="login-welcome">Hey Friend!</div>
          <div className="small-text-signup">
            Already have an account?
            <Link to="login">Log In!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
