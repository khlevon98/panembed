import * as errorCodes from '../constants/error-codes';

class ErrorService {
  constructor() {
    throw new Error('This is abstract classs.');
  }

  static parse = data => {
    const fields = ErrorService.parseFields(data);
    const message = ErrorService.parseMessage(data);

    return {
      fields,
      message,
    };
  };

  static parseFields = data => {
    return data.fields;
  };

  static parseMessage = data => {
    switch (data.code) {
      case errorCodes.NOT_FOUND.code:
        return errorCodes.NOT_FOUND.message;

      default:
        return data.message;
    }
  };
}

export default ErrorService;
