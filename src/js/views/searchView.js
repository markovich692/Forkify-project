const SearchView = class {
  #parentElement = document.querySelector('.search');

  #clearSearch() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      console.log(this);
      this.#clearSearch();
    });
  }
};

export default new SearchView();
