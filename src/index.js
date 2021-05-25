import './sass/main.scss';
import ApiService from './js/apiService';

// const options = {
//   headers: { Authorization: '21785158-d7699e1d635f5d39ae805dbbd' },
// };

const refs = {
  input: document.querySelector('.input'),
  btnSearch: document.querySelector('.btn-search'),
  btn: document.querySelector('.btn'),
};
console.log(refs.btnSearch);

const apiService = new ApiService();

refs.btnSearch.addEventListener('click', onSearch);

function onSearch(event) {
  event.preventDefault();
  apiService.searchValue = refs.input.value;
  console.log(apiService.searchValue);
  apiService.resetPage();
  apiService.fetchArticles();
}

// refs.input.addEventListener('input', onInput);

// function onInput(evt) {
//   apiService.searchValue = refs.input.value;
//   apiService.resetPage;
//   apiService.fetchArticles();
// }
refs.btn.addEventListener('click', onLoad);

function onLoad(evt) {
  apiService.fetchArticles();

  //   apiService.incrematePage();
}
