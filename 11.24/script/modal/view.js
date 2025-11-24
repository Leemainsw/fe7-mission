import { isShowTodayModal, getTodayRecommendedProduct } from './service.js';

/**
 * @description 오늘의 추천 상품 보여주는 modal template 생성 함수
 * @param {Object} todayRecommendedProduct
    * @returns {string} modal template
 */
const createModalTemplate = (todayRecommendedProduct) => {
    return `
        <div class="modalInner">
            <h1>오늘의 추천 상품</h1>
            <span>${todayRecommendedProduct.productName}</span>
            <img src='./imgs/${todayRecommendedProduct.productImgFileName}' alt='${todayRecommendedProduct.productName}' />
            <span>${todayRecommendedProduct.productPrice.toLocaleString()}원</span>
            <button id='recommendedAddCartButton'>장바구니</button>
            <div class='modal-buttons'>
                <button id='dialogCloseButton' >닫기</button>
                <button id='dialogHideButton' >오늘 하루 보지 않기</button>
            </div>
        </div>
    `;
}

/**
 * @description 모달 버튼 이벤트를 초기화합니다.
 */
const initializeModalButtonEvent = () => {
    const dialogCloseButton = document.getElementById('dialogCloseButton');
    const dialogHideButton = document.getElementById('dialogHideButton');

    dialogCloseButton.addEventListener('click', () => {
        closeModal(false);
    });

    dialogHideButton.addEventListener('click', () => {
        closeModal(true);
    });
}

/**
 * @description 모달을 닫고, 모달 데이터를 저장합니다.
 * @param {boolean} isCloseToday
 */
const closeModal = (isCloseToday) => {
    const dialog = document.querySelector('.modal');
    dialog.close();
    dialog.remove();
    
    if(isCloseToday) {
        save('showTodayModal', [{ date: getDateFormatted(new Date()), isShown: true }]);
    }
}

/** 
 * @description 오늘의 추천 상품 보여주는 modal Render 함수
 */
const renderTodayRecommendModal = async () => {
    // 오늘의 추천 상품을 보여줄지 여부를 확인
    if(!isShowTodayModal()) {
        return;
    }

    // 오늘의 추천 상품을 가져옵니다.
    const todayRecommendedProduct = await getTodayRecommendedProduct();

    // 현재 dialog가 있는지 확인하고 있다면 제거함
    const existingDialog = document.querySelector('.modal');
    if(existingDialog) {
        // 있다면 제거
        existingDialog.remove();
    }

    const dialog = document.createElement('dialog');
    dialog.classList.add('modal');

    dialog.innerHTML = createModalTemplate(todayRecommendedProduct)

    document.body.appendChild(dialog);
    initializeModalButtonEvent();
}



export { renderTodayRecommendModal};