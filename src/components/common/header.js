import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAuth, signOut } from '../../actions/actions_firebase';

export default class App extends Component {
  componentWillMount() {
    this.props.checkAuth();
  }
  getAuthState(authData){
    if(!authData){
      return <p>Please sign in</p>
    } else{
      if(authData.photoURL && authData.displayName){
        return (
          <div>
            <p><img src={authData.photoURL} /> Hey there {authData.displayName}</p>
            <button className="btn btn-danger" onClick={() => this.props.signOut()}>Sign out</button>
          </div>
        )
      } else if(!authData.photoURL && authData.displayName) {
        return (
          <div>
            <p>Hey there {authData.displayName}</p>
            <button className="btn btn-danger" onClick={() => this.props.signOut()}>Sign out</button>
          </div>
        )
      }
      return <p></p>
    }
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.getAuthState(this.props.auth.auth)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { checkAuth, signOut })(App);
