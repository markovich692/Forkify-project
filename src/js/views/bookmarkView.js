import icons from '../../img/icons.svg';
import View from './view';

class bookmarkView extends View {
  _parenElement = document.querySelector('.nav');

  _generateMarkup() {
    return `<li class="preview">
    <a class="preview__link ${
      result.id === id ? 'preview__link--active' : ''
    }          " href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

export const bookmarkView = new bookmarkView();
