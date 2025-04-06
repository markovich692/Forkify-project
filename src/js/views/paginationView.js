import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numPages);

    //On page 1 and there other pages
    if (this._data.page === 1 && numPages > 1) {
      return 'Page 1 and other pages';
    }

    //On the last page
    if (this._data.page === numPages && numPages > 1) {
      return 'Last page';
    }

    //On other pages
    if (this._data.page < numPages) {
      return 'Other pages';
    }

    //NO other pages
    return 'Page 1 and there  NO other pages';
  }
}

export default new PaginationView();
