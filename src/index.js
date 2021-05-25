import './sass/main.scss';
import ApiService from './js/apiService';
import galleryCard from './templates/galleryCard.hbs';

import { info, notice, alert, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// const options = {
//   headers: { Authorization: '21785158-d7699e1d635f5d39ae805dbbd' },
// };

const refs = {
  input: document.querySelector('.input'),
  btnSearch: document.querySelector('.btn-search'),
  btn: document.querySelector('.btn'),
  container: document.querySelector('.container'),
};
console.log(refs.btnSearch);

const apiService = new ApiService();

refs.btnSearch.addEventListener('click', onSearch);
console.log(galleryCard);

function onSearch(event) {
  event.preventDefault();
  clearMarkUp();
  apiService.searchValue = refs.input.value;

  if (apiService.searchValue === '') {
    return notice({
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

  console.log(apiService.searchValue);
  apiService.resetPage();
  apiService.fetchArticles().then(renderMarkUp);
}

// refs.input.addEventListener('input', onInput);

// function onInput(evt) {
//   apiService.searchValue = refs.input.value;
//   apiService.resetPage;
//   apiService.fetchArticles();
// }
refs.btn.addEventListener('click', onLoad);

function onLoad(evt) {
  apiService.fetchArticles().then(renderMarkUp);

  //   apiService.incrematePage();
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
