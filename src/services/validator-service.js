class ValidatorService {
  constructor(props) {
    throw new Error('This si abstract class');
  }

  static isRequired = () => ({
    rule: 'required',
    message: 'This field is required.',
  });

  static isEmail = () => ({
    rule: 'isEmail',
    message: 'Please provide correct email.',
  });

  static isPasswordMatch = value => ({
    rule: `isPasswordMatch:${value}`,
    message: 'Please reenter your password.',
  });
}

export default ValidatorService;
