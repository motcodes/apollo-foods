/*
Author: Matthias Oberholzer
Multimedia Project 1 - Web
Salzburg University of Applied Sciences
*/
export const usernameValidation = (str) =>
  /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(str)

export function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null
}
