import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions/firebase';
import ProtectedRoute from './ProtectedRoute';
import { Head } from '../components/Common/Head';
import { FourOhFour } from '../components/Content/FourOhFour';
import Avatar from '../components/Common/Avatar';

let Account = class Account extends Component {
  componentWillMount() {
    const { match, profile, history } = this.props;
    const { params } = match;
    if (params.uid !== profile.uid) {
      history.push(`/account/${profile.uid}`);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { match, profile, history } = nextProps;
    const { params } = match;
    if (params.uid !== profile.uid) {
      history.push(`/account/${profile.uid}`);
    }
  }
  render() {
    const { profile, signOut } = this.props;
    if (!profile) return <FourOhFour />;
    const { firstName, email, photoURL } = profile;
    return (
      <main className="container">
        <Head title="Account" />
        <div className="wrapper">
          <h1>Your Account</h1>
          <Avatar
            image={photoURL}
            name={firstName}
            size="medium"
            upload
          />
          <h4>{firstName}</h4>
          <p>{email}</p>
          <Link to="#" onClick={event => signOut(event)}>Logout</Link>
        </div>
      </main>
    );
  }
};

function mapStateToProps({firebase}) {
  const { profile } = firebase;
  return {
    profile
  };
}

Account = connect(mapStateToProps, { signOut })(Account);

export default ProtectedRoute(Account);
