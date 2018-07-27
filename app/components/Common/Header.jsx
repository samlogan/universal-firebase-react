import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export const Header = (props) => {
  const { profile, loggedIn, signOut } = props;
  return (
    <header id="banner">
      <div className="wrapper">
        <Logo />
        <Navigation
          profile={profile}
          loggedIn={loggedIn}
          signOut={signOut}
        />
      </div>
    </header>
  );
}
