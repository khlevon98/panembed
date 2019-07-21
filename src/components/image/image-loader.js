import React, { Component } from 'react';

import './image.scss';

class ImageLoader extends Component {
  // initial state: image loaded stage
  state = {
    loaded: false,
  };

  // define our loading and loaded image classes
  static defaultProps = {
    className: '',
    loadingClassName: 'img-loading',
    loadedClassName: 'img-loaded',
  };

  // image onLoad handler to update state to loaded
  onLoad = () => {
    this.setState(() => ({ loaded: true }));

    this.props.onLoad && this.props.onLoad();
  };

  render() {
    const { className, loadedClassName, loadingClassName, src, alt, onLoad, ...props } = this.props;

    const classNames = `${className} ${this.state.loaded ? loadedClassName : loadingClassName}`;

    return <img src={src} alt={alt} className={classNames} onLoad={this.onLoad} {...props} />;
  }
}

export default ImageLoader;
