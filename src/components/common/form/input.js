import React, { Component } from 'react';

class InputField extends Component {
  render() {
    return <input className="form-control" type={this.props.type} placeholder={this.props.placeholder} {...this.props.field} />
  }
}

export default InputField;
