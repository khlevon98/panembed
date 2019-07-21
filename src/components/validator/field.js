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
    const { label, className, ...rest } = props;
    const classNames = `${className} ${!isValid ? 'invalid' : ''}`;

    return (
      <div className="input-field">
        <input {...rest} className={classNames} />
        <label htmlFor={props.id}>{label}</label>
        {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
      </div>
    );
  };
}

Field.propTypes = {
  children: PropTypes.func,
};

export default Field;
