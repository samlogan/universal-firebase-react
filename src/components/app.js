import React, { Component } from 'react';
import Header from './common/header';

const App = ({children, history}) => {
  return (
    <div>
      <Header title={'React/Redux/Firebase Starter Kit'} />
      {children}
    </div>
  );
};

App.propTypes = {
  history: React.PropTypes.object.isRequired,
  children: React.PropTypes.object.isRequired,
};


export default App;
