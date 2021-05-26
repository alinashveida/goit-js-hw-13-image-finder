export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);
    refs.spinner = document.querySelector('.loader');
    refs.spinner2 = document.querySelector('.loader2');
    refs.label = document.querySelector('.label');

    return refs;
  }

  enable() {
    this.refs.btn.disabled = false;
    this.refs.label.textContent = 'Показать еще';
    this.refs.spinner.classList.add('is-hidden');
    this.refs.spinner2.classList.add('is-hidden');
  }

  disabled() {
    this.refs.btn.disabled = true;
    this.refs.label.textContent = 'Загружаем...';
    this.refs.spinner.classList.remove('is-hidden');
    this.refs.spinner2.classList.remove('is-hidden');
  }

  show() {
    this.refs.btn.classList.remove('is-hidden');
  }

  hide() {
    this.refs.btn.classList.add('is-hidden');
  }
}
