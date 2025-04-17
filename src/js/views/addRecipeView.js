import View from './view';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.nav__list');

  addHandlerAddRecipe(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.nav__btn--add-recipe');

      if (!btn) return;

      handler();
    });
  }
}

export default new AddRecipeView();
