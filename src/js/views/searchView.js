const SearchView = class {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this.#parentElement
      .querySelector('.search__btn')
      .addEventListener('submit', function (e) {
        e.preventDefault();
        handler;
      });
  }
};

export default new SearchView();
