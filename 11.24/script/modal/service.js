import { get } from '../../utils/localStorage.js';
import { getDateFormatted } from '../../utils/date.js';
import { getProducts } from '../data.js';

/**
 * @description 오늘의 추천 상품을 보여줄지 여부를 확인합니다.
 * 1. showTodayModal는 { date: string, isShown: boolean }형태로 저장됨
 * 2. showTodayModal가 없거나 date가 오늘날짜 + isShown이 false인 데이터가 없으면 true 반환, 그렇지 않으면 false 반환
 * @returns {boolean}
 */
const isShowTodayModal = () => {
    const showTodayModal = get('showTodayModal');

    // 데이터가 없으면 보여줘야 함
    if(!showTodayModal) {
        save('showTodayModal', [{ date: getDateFormatted(new Date()), isShown: false }]);
        return true;
    }

    const today = getDateFormatted(new Date());
    const isToday = showTodayModal['date'] === today

    // 오늘 날짜가 아니라면, 보여줘야 함
    if(!isToday)  {
        return true;
    }

    // 오늘날짜 + 보여줬으면 안보여줘도 됨
    if(showTodayModal['isShown']) {
        return false;
    }

    // 그 외는 다 보여주기
    return true;
}

/**
 * @description 오늘의 추천 상품을 가져옵니다.
 * @returns {Promise<Object>}
 */
const getTodayRecommendedProduct = async () => {
    const products = await getProducts();
    const randomIndex = Math.floor(Math.random() * products.length); // 0~2 사이의 랜덤한 숫자
    return products[randomIndex];
}

export { isShowTodayModal, getTodayRecommendedProduct } 





