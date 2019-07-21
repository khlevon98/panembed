import React, { PureComponent } from 'react';

import './pan-viewer.scss';

import Viewer from './viewer';
import Spinner from '../spinner';

class PanViewer extends PureComponent {
  container = React.createRef();

  state = {
    isLoaded: false,
    isShownHelper: true,
  };

  componentDidMount() {
    const { src } = this.props;
    const container = this.container.current;

    this.viewer = new Viewer({
      src,
      callbacks: {
        onLoad: this.handleLoad,
      },
    });

    window.aa = this.viewer;

    container.append(this.viewer.getDomElement());

    this.viewer.makeDynamic(container);

    this.viewer.start();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { src } = this.props;
    if (src !== prevProps.src) {
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
      <div className="pan-viewer" ref={this.container}>
        {loader}
        {helper}
      </div>
    );
  }

  handleLoad = () => {
    this.setState({
      isLoaded: true,
    });

    setTimeout(() => {
      this.setState({
        isShownHelper: false,
      });
    }, 5500);
  };
}

export default PanViewer;
