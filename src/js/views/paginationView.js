import icons from 'url:../../img/icons.svg';
import View from './View';
import API_URL from '../config.JS';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No page found for your query.Please try again';
  _message = '';
  _generateMarkupButtonLeft(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
  }
  _generateMarkupButtonRight(curPage) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clickedButton = e.target.closest('.btn--inline');
      if (!clickedButton) return;

      const goToPage = +clickedButton.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    console.log(this._data.results);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    //We are on page 1 and there are another pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonRight(curPage);
    }

    //We are on last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonLeft(curPage);
    }
    //Other page
    if (curPage < numPages && numPages > 1) {
      return `${this._generateMarkupButtonLeft(
        curPage
      )} ${this._generateMarkupButtonRight(curPage)}`;
    }
    //We are on page 1 and there are  no another pages
    return '';
  }
}
export default new PaginationView();
