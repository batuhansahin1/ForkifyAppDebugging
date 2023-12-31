import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  update(data) {
    {
      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));

      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
        // console.log(curEl, newEl.isEqualNode(curEl));

        // Updates changed TEXT
        if (
          !newEl.isEqualNode(curEl) &&
          newEl.firstChild?.nodeValue.trim() !== ''
        ) {
          // console.log('💥', newEl.firstChild.nodeValue.trim());
          curEl.textContent = newEl.textContent;
        }

        // Updates changed ATTRIBUES
        if (!newEl.isEqualNode(curEl))
          Array.from(newEl.attributes).forEach(attr => {
            console.log(attr.name, attr.value);
            return curEl.setAttribute(attr.name, attr.value);
          });
      });
    }

    //burada aradaki farklılıkları anlamak için yeni bir DOM oluşturduk ama bu sayfada oluşmuyor bellekte oluşuyor

    //Update changes text
  }
  renderSpinner = function () {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  renderError(errMessage = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${errMessage}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}.svg#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
