import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numberOfPages);

    //On page 1 and there other pages
    if (this._data.page === 1 && 1 < numberOfPages) {
      return 'Page 1 and other pages';
    }

    //On page 1 and there NO other pages
    if (this._data.page === 1 && numberOfPages === 1) {
      return 'Page 1 and there no other pages';
    }

    //On the last page
    if (this._data.page === numberOfPages) {
      return 'Last page';
    }

    //On other pages
    if (this._data.page != numberOfPages && this._data.page < numberOfPages) {
      return 'Other pages';
    }
  }
}

export default new PaginationView();
