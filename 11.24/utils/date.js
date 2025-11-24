/**
 * @description yyyy-MM-DD 형식의 날짜를 반환합니다.
 * @param {Date} date
 * @returns {string} yyyy-MM-DD 형식의 날짜
 */
export const getDateFormatted = (date) => {
    return date.toISOString().split('T')[0];
}