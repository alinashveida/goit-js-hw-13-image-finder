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
  container: document.querySelector('.container'),
};

const apiService = new ApiService();

refs.btnSearch.addEventListener('click', onSearch);

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
    if (hits.length === 0) {
      console.log('error');
      error({
        title: 'Ошибка',
        text: 'Ничего не найдено',
        autoOpen: true,
        minHeight: '16px',
        width: '300px',
        maxTextHeight: null,
        animateSpeed: 'normal',
        shadow: true,
        delay: 1500,
      });
    }
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

// // const basicLightbox = require('basiclightbox');

// const instance = basicLightbox.create(`
//     <img src="https://pixabay.com/get/g30422e505bc696926e6687bd5b38dbd90a3e8254f02dfbb4c65692d520651d4dfc59f9https://www.google.com/search?q=vfibyf&rlz=1C1EKKP_ruUA838UA838&sxsrf=ALeKk02dRUeNLjz4dtsvYwr1PuOFLy58ow:1622042156464&tbm=isch&source=iu&ictx=1&fir=dkYVvJw_9G0KqM%252CgDaYMRmCSpZKEM%252C_&vet=1&usg=AI4_-kSy9NtAkZPMSUxuBWpQp6bho2efCw&sa=X&ved=2ahUKEwi_pa_00efwAhVklosKHdQoDIEQ9QF6BAgQEAE&biw=1536&bih=754&dpr=1.25#imgrc=AlRbaxnC_gi_9Mhttps://pixabay.com/get/g2bb75534621aeb3ff268b9a7dfc68150f1832eb83da23467e9a56a1b21ffa24ded69a5a37c73b01273868346d5d0893b015b178d950541b9696036f3e7cd3d37_1280.jpg" width="800" height="600">
// `);

// instance.show();

// // import * as basicLightbox from 'basiclightbox';
// // import template from './templates/1.hbs';

// // const instance = basicLightbox.create(document.querySelector('template'));

// // instance.show();
