import React from 'react';

import PropTypes from 'prop-types';

import { ValidatorComponent } from 'react-form-validator-core';

class Field extends ValidatorComponent {
  render() {
    const {
      errorMessages,
      validators,
      requiredError,
      validatorListener,
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
    const { label, ...rest } = props;

    return (
      <div className="input-field">
        <input {...rest} className={props.className + (!isValid ? ' invalid' : '')} />
        <label htmlFor="">{label}</label>
        {!isValid ? <span className="helper-text">{getErrorMessage()}</span> : null}
      </div>
    );
  };
}

Field.propTypes = {
  children: PropTypes.func,
};

export default Field;