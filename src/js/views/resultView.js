import icons from 'url:../../img/icons.svg';
import View from './view';

const ResultView = class extends View {
  _parentElement = document.querySelector('.search-results');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(el) {
    return `<li class="preview">
    <a class="preview__link preview__link--active" href="#${el.id}">
      <figure class="preview__fig">
        <img src="src/img/test-1.jpg" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${el.title}</h4>
        <p class="preview__publisher">${el.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
};

export default new ResultView();
