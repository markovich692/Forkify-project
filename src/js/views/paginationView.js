import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    //We are on page 1 and there other pages
    //We are on page 1 and there NO other pages
    //We are on other pages
    //We are on the last page
  }
}

export default new PaginationView();
