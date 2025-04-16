import icons from '../../img/icons.svg';
import View from './view';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :';
  _successMessage = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView._generateMarkup(bookmark))
      .join('');
  }
}

export default new BookmarksView();
