import { bytesToMB } from '../utils';

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

  static isFile = () => ({
    rule: `isFile`,
    message: 'Please provide correct file.',
  });

  static maxFileSize = value => ({
    rule: `maxFileSize:${value}`,
    message: `File size must not exceed ${bytesToMB(value)}MB.`,
  });

  static allowedExtensions = value => ({
    rule: `allowedExtensions:${value}`,
    message: 'Please choose correct file.',
  });
}

export default ValidatorService;
