import React from 'react';

import PropTypes from 'prop-types';

import Modal from './modal';
import ErrorBoundary from '../error-boundary';

let { PUBLIC_URL } = process.env;

PUBLIC_URL = PUBLIC_URL || window.location.origin;

const GetCodeModal = ({ onClosed, onOpened, isOpened, projectId }) => {
  const url = `${PUBLIC_URL}/embed/${projectId}`;
  const iframe = `<iframe src="${url}" name="PanEmbed" allowfullscreen="true" frameborder="0" align="top" height="600px" width="800px" scrolling="none"></iframe>`;

  const copyToClipboard = ({ target }) => {
    target.select();
    document.execCommand('copy');
  };

  return (
    <ErrorBoundary>
      <Modal className="get-code-modal bottom-sheet" onCloseEnd={onClosed} onOpenEnd={onOpened} isOpened={isOpened}>
        <div className="modal-content">
          <h4>Get your embed code</h4>

          <textarea readOnly className="code materialize-textarea mb-4" onClick={copyToClipboard} value={url} />
          <textarea readOnly className="code materialize-textarea" onClick={copyToClipboard} value={iframe} />
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">
            Close
          </a>
        </div>
      </Modal>
    </ErrorBoundary>
  );
};

GetCodeModal.defaultProps = {
  isOpened: false,
  onOpened: () => {},
  onClosed: () => {},
};

GetCodeModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  isOpened: PropTypes.bool,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
};

export default GetCodeModal;
