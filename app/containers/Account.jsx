import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signOut } from '../actions/firebase';
import { Head } from '../components/Common/Head';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import Avatar from '../components/Common/Avatar';

class Account extends Component {
  componentWillMount() {
    const { params, profile, history } = this.props;
    if (params.uid !== profile.uid) {
      history.push(`/account/${profile.uid}`);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { params, profile, history } = nextProps;
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
          <Link to="#" onClick={(event) => signOut(event)}>Logout</Link>
        </div>
      </main>
    );
  }
}

function mapStateToProps({firebase}) {
  const { profile } = firebase;
  return {
    profile
  };
}

export default connect(mapStateToProps, { signOut })(Account);
