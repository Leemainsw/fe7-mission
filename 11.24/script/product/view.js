import { getProducts } from '../data.js';

const createProductTemplate = (product) => {
    return `
        <li class="product-item">
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
}

export { renderProductList }