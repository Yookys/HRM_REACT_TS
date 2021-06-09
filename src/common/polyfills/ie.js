/**
 * Функция для поиска родителя
 * Обязательно она должна быть НЕ анонимной, т.к. нужен контекст
 */
function closest(css) {
  let node = this;
  while (node) {
    if (node.matches(css)) return node;
    node = node.parentElement;
  }
  return null;
}

/**
 * Добавление полифилов
 */
const setPolyfills = () => {
  ((e) => {
    if (!e.closest) {
      e.closest = closest;
    }
    if (!e.matches) {
      e.matches = Element.prototype.msMatchesSelector;
    }
  })(Element.prototype);
};

export default setPolyfills;
