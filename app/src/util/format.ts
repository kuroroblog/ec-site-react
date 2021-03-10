import HTMLReactParser from 'html-react-parser'

/**
 * @comment 3桁ごとにお金を区切る関数
 *
 * @param price number
 *
 * @returns {string}
 */
export const covertPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Convert Carriage Return and Line Feed into <br> tag.
 *
 * @param {string} text The row text
 *
 * @returns { string | JSX.Element | JSX.Element[] } The formatted text
 */
export const returnCodeToBr = (text: string) => {
  return text === '' ? text : HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
}
