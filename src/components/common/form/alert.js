import React, { Component } from 'react';

class Alert extends Component {
  render() {
    if(this.props.type == 'success' ){
      return <p className={'bg-success'}>{this.props.message}</p>
    } else if(this.props.type == 'warning'){
      return <p className={'bg-warning'}>{this.props.message}</p>
    } else{
      return <p className={'bg-danger'}>{this.props.message}</p>
    }
  }
}

export default Alert;
