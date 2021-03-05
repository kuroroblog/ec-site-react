export const passwordMaxLength = 6
export const descriptionMaxLength = 50

/**
 * Show an alert if required input is blank
 *
 * @param args Required input values
 *
 * @returns {boolean}
 */
export const isValidRequiredInput = (...args: Array<string>): boolean => {
  let validateFlag = true
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '') {
      validateFlag = false
      break
    }
  }
  return validateFlag
}

/**
 * Validate input email
 *
 * @param email
 *
 * @returns {boolean}
 */
export const isValidEmailFormat = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(email)
}

/**
 * Show an alert if description >= max length
 *
 * @param description description
 * @param maxLength max length
 *
 * @returns {boolean}
 */
export const isValidTextCnt = (description: string, maxLength: number): boolean => {
  let validateFlag = false
  if (description.replace(/\s+/g, '').length >= maxLength) {
    validateFlag = true
  }
  return validateFlag
}
