import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

export const Navigation = (props) => {
  const { profile, loggedIn, signOut } = props;
  const getAccountLink = () => {
    if (loggedIn) return <NavLink to={`/account/${profile.uid}`}>Hi {profile.firstName}</NavLink>;
    return <NavLink to="/register">Register</NavLink>;
  };
  const getLoginLogoutLink = () => {
    if (loggedIn) return <NavLink to="#" onClick={event => signOut(event)}>Logout</NavLink>;
    return <NavLink to="/login">Login</NavLink>;
  };
  return (
    <nav className="navigation">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li>{getAccountLink()}</li>
        <li>{getLoginLogoutLink()}</li>
        <li><NavLink to="/add">Add Post</NavLink></li>
      </ul>
    </nav>
  );
};
