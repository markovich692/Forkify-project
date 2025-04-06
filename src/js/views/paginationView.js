import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numberOfPages = Math.trunc(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numberOfPages);
    //On page 1 and there other pages
    // if (this_data.page === 1 && numberOfPages <= 10);

    //On page 1 and there NO other pages
    //On other pages
    //On the last page
    // if (this._data.page === 1 && this_data.results.length >10 );
  }
}

export default new PaginationView();
