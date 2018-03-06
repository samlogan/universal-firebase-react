import React from 'react';
import './Avatar.scss';

export const Avatar = (props) => {
  const { image, name, size, upload, showName } = props;
  const sizeClass = !size ? 'medium' : size;
  const uploadPhoto = (event, upload) => {
    event.preventDefault();
    if (upload) {
      console.log('Handle image upload here');
    }
  };
  return (
    <div className="avatar">
      <div
        className={upload ? `photo upload ${sizeClass}` : `photo ${sizeClass}`}
        style={{backgroundImage: `url('${image}')`}}
        onClick={event => uploadPhoto(event, upload)}
        role="button"
        tabIndex="0"
      >
        {!image && name ? <span className="avatar-letter">{name.charAt(0)}</span> : null}
      </div>
      {showName ? <h4 className="name">{name}</h4> : null}
    </div>
  );
};
