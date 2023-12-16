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

  static validateName(name) {
    const nameRegex = /^[a-zA-Z]{2,}.*$/;
    return nameRegex.test(name);
  }
  static validateSurname(surname) {
    const surnameRegex = /^[a-zA-Z]{2,}.*$/;
    return surnameRegex.test(surname);
  }

  static validateAddress(address) {
    const addressRegex = /^[a-zA-Z]{8,}.*$/;
    return addressRegex.test(address);
  }
}

export default Validator;
