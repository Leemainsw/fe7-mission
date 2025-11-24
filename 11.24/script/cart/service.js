import {get, save} from '../../utils/localstorage.js'
import {getProduct} from '../data.js';

/**
 * @description 장바구니를 초기화합니다.
 * @returns {void}
 */
const initCart = () => {
    const result = confirm(`장바구니를 초기화하시겠습니까?\n${getAllCartItemListForTemplate()}`);
    if(!result) return;

    save('cart', JSON.stringify([]));
    alert('장바구니가 초기화되었습니다.');
}

/**
 * @description 장바구니 아이템 리스트를 템플릿에 맞게 반환합니다.
 * @param {*} product 
 * @returns 
 */
const getAllCartItemListForTemplate = () => {
const cartList = getCartList();
  return cartList.map((item) => `${item.productName} - ${item.quantity}개`).join('\n');
}


/**
 * @description 장바구니 목록을 가져옵니다.
 * @returns {Array<Object>}
 */
const getCartList = () => {
    const cartList = get('cart');
    if(!cartList) return [];
    return JSON.parse(cartList);
}


/**
 * @description 장바구니에 아이템을 추가합니다.
 * @param {Object} product
 * @returns {void}
 */
// 
const addCartItem = async (id) => {
    const product= await getProduct(id)
    if(!product) return;

  const cartList = getCartList();
  const newCartList = [...cartList];
  const findIndex = cartList.findIndex((item) => item.id === Number(id));
  const newCart = newCartList[findIndex]

  const quantity = confirmItemQuantity(product);
  if(!quantity)  {
    alert('장바구니에 추가하지 않았습니다.');
    return;
  }

  if(!hasCartItem(product)) {
    newCartList.push({...product, quantity});
  } else {
    newCart.quantity += quantity;
  }

  save('cart', JSON.stringify(newCartList));
  
  alert(`${product.productName}이 장바구니에 추가되었습니다.\n총 ${newCart ? newCart.quantity :  quantity}개 있습니다.`);
}

/**
 * @description 아이템 개수를 입력받습니다.
 * @param {*} product 
 * @returns {number | false}
 */
const confirmItemQuantity = (product) => {
    const count = prompt(`${product.productName} 몇 개를 추가할까요?`, '1');
    if(count === null) return false;
    return Number(count);
  
}

/**
 * @description 장바구니에 아이템이 있는지 확인합니다.
 * @param {*} product 
 * @returns 
 */
const hasCartItem = (product) => {
  const cartList = getCartList();
  const findIndex = cartList.findIndex((item) => item.id === product.id);
  return findIndex !== -1;
}

export { initCart, getCartList, addCartItem };