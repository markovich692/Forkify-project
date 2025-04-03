const SearchView = class {
  #parentElement = document.querySelector('.search');

  clearSearch() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  getQuery() {
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
