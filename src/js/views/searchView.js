const SearchView = class {
  #parentElement = document.querySelector('.search');

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  getQuery() {
    this.#clearInput();
    return this.#parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
};

export default new SearchView();
