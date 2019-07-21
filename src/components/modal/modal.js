import React, { Component } from 'react';

import PropTypes from 'prop-types';

import M from 'materialize-css';

class Modal extends Component {
  _Modal = React.createRef();

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        this.props.onOpenStart(this._Modal.current);
      },
      onOpenEnd: () => {
        this.props.onOpenEnd(this._Modal.current);
      },
      onCloseStart: () => {
        this.props.onCloseStart(this._Modal.current);
      },
      onCloseEnd: () => {
        this.props.onCloseEnd(this._Modal.current);
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: '4%',
      endingTop: '10%',
    };
    this._modalInstance = M.Modal.init(this._Modal.current, options);
    // If you want to work on instance of the Modal then you can use the below code snippet
    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  componentWillUnmount() {
    this._modalInstance.destroy();
  }

  componentDidUpdate(prevProps) {
    const { isOpened } = this.props;

    if (isOpened !== prevProps.isOpened) {
      if (isOpened) this._modalInstance.open();
      else this._modalInstance.close();
    }
  }

  render() {
    return (
      <div ref={this._Modal} className={`modal ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

Modal.defaultProps = {
  isOpened: false,
  onOpenStart: () => {},
  onOpenEnd: () => {},
  onCloseStart: () => {},
  onCloseEnd: () => {},
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpened: PropTypes.bool,
  onOpenStart: PropTypes.func,
  onOpenEnd: PropTypes.func,
  onCloseStart: PropTypes.func,
  onCloseEnd: PropTypes.func,
};

export default Modal;
