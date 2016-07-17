import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './common/header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header title={'React/Redux/Firebase Starter Kit'} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
