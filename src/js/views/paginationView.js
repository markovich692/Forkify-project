import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    //On page 1 and there other pages
    if (
      this._data.page === 1 &&
      this_data.results.length > this._data.resultsPerPage
    );

    //On page 1 and there NO other pages
    if (
      this._data.page === 1 &&
      this_data.results.length <= this._data.resultsPerPage
    );

    //On other pages
    if (
      this._data.page !== 1 &&
      this_data.results.length > this._data.resultsPerPage
    );
    //On the last page

    // if (this._data.page === 1 && this_data.results.length >10 );
  }
}

export default new PaginationView();
