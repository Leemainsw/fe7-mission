import {getCartList, initCart} from './service.js';

const createCartTemplate = (cartItem) => {
    return `
       <li class="cart-item">
            <h3>${cartItem.productName}</h3>
            <img src='./imgs/${cartItem.productImgFileName}' alt='${cartItem.productName}' />
            <span>${cartItem.productPrice.toLocaleString()}원</span>
            <span>${cartItem.quantity}개</span>
        </li>
    `;
}

const renderCartList = () => {
    const cartList = getCartList();
    const ul = document.querySelector('.cart-list');
    if(cartList.length === 0) {
        ul.innerHTML = '<li>장바구니가 비었습니다.</li>';
        return;
    }
    ul.innerHTML = cartList.map(cartItem => createCartTemplate(cartItem)).join('');
}

const initializeRemoveCartItemEvent = () => {
    const clearButton = document.querySelector('.clearCart');
    clearButton.addEventListener('click', (e) => {
        initCart();
    });
}


export { renderCartList, initializeRemoveCartItemEvent }