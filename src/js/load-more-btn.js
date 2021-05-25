export default class LoadMoreBtn {
  constructor(selector, hidden = false) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);
    refs.spinner = document.querySelector('.spinner');
    refs.label = document.querySelector('.label');

    return refs;
  }
}
