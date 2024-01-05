class Validator {
  static validateGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

  static validateEmailForContact(emailforContact) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@info\.com$/;
    return gmailRegex.test(emailforContact);
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
    console.log(address.length);
    if (address.length >= 10) {
      return true;
    } else {
      return false;
    }
  }
}

export default Validator;
