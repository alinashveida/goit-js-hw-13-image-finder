import './sass/main.scss';
import ApiService from './js/apiService';
import galleryCard from './templates/galleryCard.hbs';

import { info, notice, alert, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import LoadMoreBtn from './js/load-more-btn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.btn',
  hidden: true,
});

const refs = {
  input: document.querySelector('.input'),
  btnSearch: document.querySelector('.btn-search'),
  // btn: document.querySelector('.btn'),
  container: document.querySelector('.container'),
};

const apiService = new ApiService();

refs.btnSearch.addEventListener('click', onSearch);
console.log(galleryCard);

function onSearch(event) {
  event.preventDefault();
  apiService.searchValue = refs.input.value;

  if (apiService.searchValue === '') {
    notice({
      title: 'Ошибка',
      text: 'Введите текст',
      autoOpen: true,
      minHeight: '16px',
      width: '300px',
      maxTextHeight: null,
      animateSpeed: 'normal',
      shadow: true,
      delay: 1500,
    });
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearMarkUp();
  fetchArticles();
}

loadMoreBtn.refs.btn.addEventListener('click', onLoad);

function onLoad(evt) {
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disabled();
  apiService.fetchArticles().then(hits => {
    renderMarkUp(hits);
    loadMoreBtn.enable();
  });
}

function renderMarkUp(hits) {
  console.log(hits);
  refs.container.insertAdjacentHTML('beforeend', galleryCard(hits));
}

function clearMarkUp() {
  refs.container.innerHTML = '';
}
//---------------------------------------------------------
// import * as basicLightbox from 'basiclightbox';

// const basicLightbox = require('basiclightbox');

// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `);

// instance.show();

// import * as basicLightbox from 'basiclightbox';
// import template from './templates/1.hbs';

// const instance = basicLightbox.create(document.querySelector('template'));

// instance.show();
