import React from 'react';
import { Link } from 'react-router';

export const Navigation = props => {
  const { openAuthModal, profile, loggedIn, signOut } = props;
  const getAccountLink = () => {
    if (loggedIn) return <Link to={`/account/${profile.uid}`}>Hi {profile.firstName}</Link>;
    return <Link to="#" onClick={(event) => openAuthModal(event, 'register')}>Register</Link>;
  };
  const getLoginLogoutLink = () => {
    if (loggedIn) return <Link to="#" onClick={(event) => signOut(event)}>Logout</Link>;
    return <Link to="#" onClick={(event) => openAuthModal(event, 'login')}>Login</Link>;
  };
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>{getAccountLink()}</li>
        <li>{getLoginLogoutLink()}</li>
        <li><Link to="/add">Add Post</Link></li>
      </ul>
    </nav>
  );
};
