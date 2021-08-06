import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './Login.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='logout-holder'>
      < button className = 'logout-button' onClick = { onLogout } > </button >
    </div>


  )
};

export default LogoutButton;
