import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    // if (!this._data) return;

    this._parentElement.addEventListener('click', function (e) {
      let curEl;
      if (e.target.classList.contains('pagination')) return;
      if (!e.target.classList.contains('.btn-inline'))
        curEl = e.target.closest('.btn--inline');

      console.log(curEl);

      if (curEl.classList.contains('.pagination__btn--next')) {
        this._data.page = this._data.page + 1;

        // this._generateMarkup();
      }

      if (curEl.classList.contains('.pagination__btn--prev')) {
        this._data.page = this._data.page - 1;

        // this._generateMarkup();
      }
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numPages);

    //On page 1 and there other pages
    if (curPage === 1 && numPages > 1) {
      return ` <button class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    //On page 1 and NO other pages
    if (curPage === numPages && numPages > 1) {
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }

    //On other pages
    if (curPage < numPages) {
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    //NO other pages
    return '';
  }
}

export default new PaginationView();
