import React, { Component } from 'react';
import './LazyImage.scss';

export default class LazyImage extends Component {
  state = { imageLoaded: false };

  componentDidMount() {
    const {
      src,
    } = this.props;
    const imageData = new Image();
    imageData.src = src;
    imageData.onload = () => {
      this.setState({ imageLoaded: true });
    };
  }

  render() {
    const {
      src,
      srcSet,
      placeholder,
      className,
      alt,
      children
    } = this.props;
    const { imageLoaded } = this.state;
    return (
      <div className={`image-bg-container ${className || ''}`} style={{ background: `url('${placeholder}') center`, backgroundSize: 'cover' }}>
        <img
          alt={alt}
          src={src}
          srcSet={srcSet}
          className="image-bg"
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        {children}
      </div>
    );
  }
}
