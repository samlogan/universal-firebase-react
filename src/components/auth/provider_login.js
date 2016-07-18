import React, { Component } from 'react';

class ProviderLogin extends Component {
  render() {
    const { error } = this.props;
    return (
      <div>
        <button className="btn btn-primary" onClick={() => this.props.loginFunction()}>Sign in with {this.props.provider}</button>
      </div>
    );
  }
}

export default ProviderLogin;
