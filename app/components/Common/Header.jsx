import React, { Component } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import AuthModal from '../Auth/AuthModal';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthModal: false,
      authType: 'login'
    };
  }
  componentWillReceiveProps(nextProps) {
    const { loggedIn, closeModal } = nextProps;
    if (!this.props.loggedIn && loggedIn) this.setState({ showAuthModal: false });
    if (!this.props.closeModal && closeModal) this.setState({ showAuthModal: false });
  }
  openAuthModal(event, authType) {
    event.preventDefault();
    document.body.classList.add('modal-open');
    this.setState({
      authType,
      showAuthModal: true,
    });
  }
  closeAuthModal(event) {
    event.preventDefault();
    document.body.classList.remove('modal-open');
    this.setState({
      showAuthModal: false,
    });
  }
  render() {
    const { showAuthModal, authType } = this.state;
    const { profile, loggedIn, signOut, closeModal } = this.props;
    return (
      <header id="banner">
        <div className="wrapper">
          <Logo />
          <Navigation
            openAuthModal={(event, type) => this.openAuthModal(event, type)}
            profile={profile}
            loggedIn={loggedIn}
            signOut={signOut}
          />
          <AuthModal
            active={showAuthModal}
            type={authType}
            openAuthModal={(event, type) => this.openAuthModal(event, type)}
            closeAuthModal={(event) => this.closeAuthModal(event)}
          />
        </div>
      </header>
    );
  }
}
