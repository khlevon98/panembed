import { ValidatorForm } from 'react-form-validator-core';

class Form extends ValidatorForm {}

Form.addValidationRule('isPasswordMatch', (value = '', fieldValue = '') => {
  return value.trim() === fieldValue.trim();
});

export default Form;
