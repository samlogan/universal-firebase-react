import React, { Component } from 'react';
import Header from './common/header'

const App = ({children, history}) => {
  return (
    <div>
      <Header title={'React/Redux/Firebase Starter Kit'} />
      {children}
    </div>
  )
}

export default App;
