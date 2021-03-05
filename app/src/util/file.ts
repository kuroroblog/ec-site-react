const fileLength = 16
const randomValues = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * Response make file object
 *
 * @param file any
 *
 * @returns {Blob}
 */
export const makeFile = (file: any): Blob => {
  return new Blob(file, { type: 'image/jpeg' })
}

/**
 * Response file name
 *
 * @returns {string}
 */
export const generatedFileName = (): string => {
  return Array.from(crypto.getRandomValues(new Uint32Array(fileLength)))
    .map((n) => randomValues[n % randomValues.length])
    .join('')
}
