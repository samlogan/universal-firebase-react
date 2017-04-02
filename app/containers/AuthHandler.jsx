import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseAuth } from '../utils/firebase';
import { captureRedirect } from '../actions/firebase';
import { Loading } from '../components/Content/Loading';

class AuthHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    setTimeout(() => this.setState({loading: false}), 2000);
  }
  componentDidMount() {
    const { loggedIn, currentURL } = this.props;
    if (!loggedIn) {
      this.props.captureRedirect(currentURL);
    }
  }
  render() {
    if (this.props.loggedIn) return this.props.children;
    if (this.state.loading) return <Loading />;
    this.props.history.push('/register');
    return null;
  }
}

function mapStateToProps({firebase}, ownProps) {
  const { loggedIn } = firebase;
  return {
    loggedIn,
    currentURL: ownProps.location.pathname
  };
}

export default connect(mapStateToProps, { captureRedirect })(AuthHandler);
