const SearchView = class {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('search_field').value;
  }

  getSearch() {
    this.#parentElement
      .querySelector('.search_btn')
      .addEventListener('click', this.getQuery);
  }
};

export default new SearchView();
