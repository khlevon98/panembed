import React, { PureComponent } from 'react';

import './pan-viewer.scss';

import Viewer from './viewer';
import Spinner from '../spinner';

class PanViewer extends PureComponent {
  _containerRef = React.createRef();

  _helperTm = null;

  state = {
    isLoaded: false,
    isShownHelper: true,
  };

  componentDidMount() {
    const { src } = this.props;
    const container = this._containerRef.current;

    this.viewer = new Viewer({
      src,
      callbacks: {
        onLoad: this.handleLoad,
      },
    });

    container.append(this.viewer.getDomElement());

    this.viewer.makeDynamic(container);

    this.viewer.start();
  }

  componentWillReceiveProps(nextProps) {
    const { src } = this.props;
    if (src !== nextProps.src) {
      this.setState({
        isLoaded: false,
        isShownHelper: true,
      });

      this.viewer.loadImage({
        src,
      });
    }
  }

  componentWillUnmount() {
    this.viewer.destroy();
    clearTimeout(this._helperTm);
  }

  render() {
    const { isLoaded, isShownHelper } = this.state;

    const helper =
      isLoaded && isShownHelper ? (
        <div className="viewer-helper">
          <i className="material-icons icon">mouse</i>
        </div>
      ) : null;

    const loader = !isLoaded ? <Spinner /> : null;

    return (
      <div className="pan-viewer" ref={this._containerRef}>
        {loader}
        {helper}
      </div>
    );
  }

  handleLoad = () => {
    this.setState({
      isLoaded: true,
    });

    this._helperTm = setTimeout(() => {
      this.setState({
        isShownHelper: false,
      });
    }, 5500);
  };
}

export default PanViewer;
