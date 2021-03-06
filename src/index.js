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
  sentinel: document.querySelector('#sentinel'),
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
    return;
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearMarkUp();
  fetchArticles();
}

loadMoreBtn.refs.btn.addEventListener('click', fetchArticles);

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

      refs.input.value = '';
    }
    renderMarkUp(hits);

    loadMoreBtn.enable();
    scroll();
  });
}

function renderMarkUp(hits) {
  refs.container.insertAdjacentHTML('beforeend', galleryCard(hits));
}

function clearMarkUp() {
  refs.container.innerHTML = '';
}

function scroll() {
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.scrollHeight,
  });
}

// function scroll() {
//   const element = document.querySelector('body');
//   element.scrollIntoView({
//     behavior: 'smooth',
//     block: 'end',
//   });
// }

//-------------------------SCROLL-------------------------------
// const onEntry = entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting && apiService.searchValue !== '') {
//       console.log(entry);
//       fetchArticles();
//     }
//   });
// };
// const options = {
//   rootMargin: '150px',
// };
// const observer = new IntersectionObserver(onEntry, options);

// observer.observe(refs.sentinel);
