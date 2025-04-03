const SearchView = class {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  addHandlerRender(get) {
    this.#parentElement
      .querySelector('.search__btn')
      .addEventListener('click', get);
  }
};

export default new SearchView();
