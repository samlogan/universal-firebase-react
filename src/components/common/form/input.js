import React, { Component } from 'react';

class InputField extends Component {
  render() {
    return <input className="form-control" type={this.props.type} placeholder={this.props.placeholder} {...this.props.field} />;
  }
}

InputField.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  type: React.PropTypes.object.isRequired,
  field: React.PropTypes.string.isRequired
};

export default InputField;
