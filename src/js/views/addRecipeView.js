import View from './view';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  addHandlerAddRecipe(handler) {
    // this._btnOpen.addEventListener('click', e => {
    //   if (!e.target) return;
    //   Array.from(document.querySelectorAll('.hidden')).forEach(elements => {
    //     elements.classList.remove('hidden');
    //   });
    // handler();
    // });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
