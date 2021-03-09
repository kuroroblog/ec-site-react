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

/**
 * Show an alert if required array is empty
 *
 * @param images Array<{ id: string; path: string }>
 *
 * @returns {boolean}
 */
export const isValidImageInput = (images: Array<{ id: string; path: string }>): boolean => {
  let validateFlag = true
  if (images.length <= 0) {
    validateFlag = false
  }
  return validateFlag
}

/**
 * Show an alert if required array is empty
 *
 * @param sizes Array<{ size: string; quantity: number }>
 *
 * @returns {boolean}
 */
export const isValidSizeInput = (sizes: Array<{ size: string; quantity: number }>): boolean => {
  let validateFlag = true
  if (sizes.length <= 0) {
    validateFlag = false
  }
  return validateFlag
}

/**
 * Show an alert if required price <= 0
 *
 * @param price number
 *
 * @returns {boolean}
 */
export const isValidPriceInput = (price: number): boolean => {
  let validateFlag = true
  if (price <= 0) {
    validateFlag = false
  }
  return validateFlag
}
