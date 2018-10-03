import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import ErrorBoundary from '../Common/ErrorBoundary';

export const Header = (props) => {
  const { profile, loggedIn, signOut } = props;
  return (
    <header id="banner">
      <div className="wrapper">
        <Logo />
        <ErrorBoundary>
          <Navigation
            profile={profile}
            loggedIn={loggedIn}
            signOut={signOut}
          />
        </ErrorBoundary>
      </div>
    </header>
  );
};
