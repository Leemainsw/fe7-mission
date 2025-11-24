import { renderProductList } from './script/product/view.js';
import { renderTodayRecommendModal } from './script/modal/view.js';
import { initializeRemoveCartItemEvent } from './script/cart/view.js';

// 오늘의 추천상품 모달 노출
await renderTodayRecommendModal();


// 제품 목록 렌더링
await renderProductList();

initializeRemoveCartItemEvent();
