import { getProducts } from '../data.js';
import { addCartItem } from '../cart/service.js';

const createProductTemplate = (product) => {
    return `
        <li class="product-item" id='product-${product.id}'>
            <h3>${product.productName}</h3>
            <img src='./imgs/${product.productImgFileName}' alt='${product.productName}' />
            <span>${product.productPrice.toLocaleString()}원</span>
            <button>장바구니</button>
        </li>
    `;
}

const renderProductList = async () => {
    const productList = document.querySelector('.product-list');
    const products = await getProducts();
    productList.innerHTML = products.map(product => createProductTemplate(product)).join('');    

    initializeProductButtonEvent();
}

/**
 * @description 제품 버튼 이벤트를 초기화합니다.
 * @returns {void}
 */
const initializeProductButtonEvent = () => {
    const productList = document.querySelector('.product-list');
    productList.addEventListener('click', async (e) => {
        // 이벤트 위임을 사용하여 클릭된 가장 가까운 버튼을 찾음
        const btn = e.target.closest('button');
        if(!btn) return;

        const id = btn.closest('li').id.split('product-')[1];
        await addCartItem(id);
    });
}

export { renderProductList }