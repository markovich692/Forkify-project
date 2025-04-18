import icons from 'url:../../img/icons.svg';
import View from './view';
import previewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _successMessage = '';

  _generateMarkup() {
    //This will return a markup that will then be joined into one string
    return this._data.map(rec => previewView.render(rec, false)).join('');
  }
}

export default new ResultView();
