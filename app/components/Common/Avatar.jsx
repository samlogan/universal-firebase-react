import React, { Component } from 'react';
import './Avatar.scss';

export default class Avatar extends Component {
  uploadPhoto(event, upload) {
    event.preventDefault();
    if (upload) {
      console.log('Handle image upload here');
    }
  }
  render() {
    const { image, name, size, upload, showName } = this.props;
    const sizeClass = !size ? 'medium' : size;
    return (
      <div className="avatar">
        <div className={upload ? `photo upload ${sizeClass}` : `photo ${sizeClass}`} style={{backgroundImage: `url('${image}')`}} onClick={(event) => this.uploadPhoto(event, upload)}>
          {!image && name ? <span className="avatar-letter">{name.charAt(0)}</span> : null}
        </div>
        {showName ? <h4 className="name">{name}</h4> : null}
      </div>
    );
  }
}
