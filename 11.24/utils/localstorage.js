/**
 * @description 로컬 스토리지에 데이터를 저장합니다.
 * @param {string} key 
 * @param {string} value 
 */
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 로컬 스토리지에서 데이터를 가져옵니다.
 * @param {string} key 
 * @returns {string}
 */
export function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * @description 로컬 스토리지에서 데이터를 삭제합니다.
 * @param {string} key 
 */
export function remove(key) {
    localStorage.removeItem(key);
}

/**
 * @description 로컬 스토리지에서 모든 데이터를 삭제합니다.
 */
export function removeAll() {
    localStorage.clear();
}

export { save, get, remove, removeAll };