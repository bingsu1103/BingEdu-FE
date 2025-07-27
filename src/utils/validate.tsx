const validateUsername = (
  value: string,
  setUsernameError: (v: string) => void
) => {
  if (!value.trim()) {
    setUsernameError("Username cannot be empty");
  } else {
    setUsernameError("");
  }
};
const validateEmail = (value: string, setEmailError: (v: string) => void) => {
  if (!value.endsWith("@gmail.com")) {
    setEmailError("Email must end with @gmail.com");
  } else {
    setEmailError("");
  }
};

const validatePassword = (
  value: string,
  setPasswordError: (v: string) => void
) => {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isLongEnough = value.length >= 8;

  const isValid =
    isLongEnough && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  if (!isValid) {
    setPasswordError(
      "Password must be at least 8 characters and contain at least one uppercase, one letter, one number, and one special character."
    );
  } else {
    setPasswordError("");
  }
};
const validatePhone = (value: string, setPhoneError: (v: string) => void) => {
  const isValidPhone = /^[0-9]+$/.test(value);
  if (!isValidPhone || value.length != 10) {
    setPhoneError("Phone must contain only numbers with length 10");
  } else {
    setPhoneError("");
  }
};

export default {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePhone,
};
