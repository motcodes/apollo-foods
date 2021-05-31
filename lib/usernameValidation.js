export const usernameValidation = (str) =>
  new RegExp(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, str)