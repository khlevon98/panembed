import React from 'react';

import PropTypes from 'prop-types';

import { ValidatorComponent } from 'react-form-validator-core';

class FileField extends ValidatorComponent {
  render() {
    const {
      errorMessages,
      validators,
      requiredError,
      validatorListener,
      value,
      children: renderField = this.renderField,
      ...rest
    } = this.props;

    const { isValid } = this.state;

    return renderField({
      isValid,
      getErrorMessage: this.getErrorMessage,
      props: rest,
    });
  }

  renderField = ({ props, isValid, getErrorMessage }) => {
    const { label, className, ...rest } = props;

    const classNames = `${className} file-path ${!isValid ? 'invalid' : ''}`;
    return (
      <div className="file-field input-field">
        <div className="btn">
          <span>{label}</span>
          <input type="file" {...rest} />
        </div>
        <div className="file-path-wrapper">
          <input className={classNames} type="text" />
          {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
        </div>
      </div>
    );
  };
}

FileField.propTypes = {
  children: PropTypes.func,
};

export default FileField;
