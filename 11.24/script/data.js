/**
 * @description 제품 목록을 가져옵니다.
 * @returns {Promise<Array>}
 */
const getProducts = async () => {
    const response = await fetch('../mock.json');
    return response.json();
}

export { getProducts }