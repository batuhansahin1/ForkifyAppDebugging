import icons from 'url:../../img/icons.svg';
import View from './View';
import API_URL from '../config.JS';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query.Please try again';
  _message = '';
  // hocadan önce benim yaptığım çalışan kod ama kod çok tekrar ettiği için inheritance yapısını kullanmaya karar verdim

  // #searchResult = document.querySresultector('.search-results');
  // renderSearchResults(data) {
  //   this._data = data;
  //   console.log(data);
  //   console.log(this._data);
  //   const markup = this._generateMarkup();

  //   this._clear();
  //   this._parentresultement.insertAdjacentHTML('afterbegin', markup);
  // }

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
          <a class="preview__link ${
            result.id === id ? 'preview__link--active' : ''
          }"  href=#${result.id}
          )}>
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
export default new ResultsView();
