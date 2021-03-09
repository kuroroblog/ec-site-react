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
