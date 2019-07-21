import React, { PureComponent } from 'react';

import LazyLoad from 'react-lazy-load';
import ImageLoader from './image-loader';

class Image extends PureComponent {
  render() {
    return (
      <LazyLoad height="100%" width="100%">
        <ImageLoader {...this.props} />
      </LazyLoad>
    );
  }
}

export default Image;
