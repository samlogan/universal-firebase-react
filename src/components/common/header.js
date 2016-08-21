import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { checkAuth, signOut } from '../../actions/actions_firebase_auth';

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount() {
    this.props.checkAuth();
  }
  getAuthState(authData){
    if(!this.props.auth.loggedIn){
      return <span></span>;
    } else{
      if(authData.photoURL && authData.displayName){
        return (
          <div>
            <p><img src={authData.photoURL} /> Hey there {authData.displayName}</p>
            <button className="btn btn-danger" onClick={() => this.signOut()}>Sign out</button>
          </div>
        );
      } else if(!authData.photoURL && authData.displayName) {
        return (
          <div>
            <p>Hey there {authData.displayName}</p>
            <button className="btn btn-danger" onClick={() => this.signOut()}>Sign out</button>
          </div>
        );
      }
      else if(authData && !authData.photoURL && !authData.displayName) {
        return (
          <div>
            <p>Hey there</p>
            <button className="btn btn-danger" onClick={() => this.signOut()}>Sign out</button>
          </div>
        );
      }
      return <p></p>;
    }
  }
  signOut(){
    this.context.router.push(`/`);
    this.props.signOut();
  }
  render() {
    return (
      <div>
        <h1><Link to="/">{this.props.title}</Link></h1>
        {this.getAuthState(this.props.auth.auth)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  auth: React.PropTypes.object.isRequired,
  checkAuth: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, { checkAuth, signOut })(Header);
