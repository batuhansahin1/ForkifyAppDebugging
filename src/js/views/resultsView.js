import icons from 'url:../../img/icons.svg';
import View from './View';
import API_URL from '../config.JS';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query.Please try again';
  _message = '';
  // hocadan önce benim yaptığım çalışan kod ama kod çok tekrar ettiği için inheritance yapısını kullanmaya karar verdim

  // #searchResult = document.querySelector('.search-results');
  // renderSearchResults(data) {
  //   this._data = data;
  //   console.log(data);
  //   console.log(this._data);
  //   const markup = this._generateMarkup();

  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(el => {
        return `<li class="preview">
          <a class="preview__link " href=#${el.id}
          )}>
            <figure class="preview__fig">
              <img src="${el.image}" alt="${el.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${el.title}</h4>
              <p class="preview__publisher">${el.publisher}</p>
              
            </div>
          </a>
        </li>`;
      })
      .join('');
  }
}
export default new ResultsView();
