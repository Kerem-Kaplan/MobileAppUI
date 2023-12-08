class Validator {
  static validateGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

  static validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  }

  static validateIdentitiy(identityNumber) {
    const identityNumberRegex = /^\d{11}$/;
    return identityNumberRegex.test(identityNumber);
  }

  static validatePassword(password) {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  }
}

export default Validator;
