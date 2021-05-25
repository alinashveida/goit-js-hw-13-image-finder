export default class ApiService {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }
  fetchArticles() {
    console.log(this);
    const KEY = '21785158-d7699e1d635f5d39ae805dbbd';

    const URl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchValue}&page=${this.page}&per_page=12&key=${KEY}`;

    fetch(URl)
      .then(r => r.json())
      .then(data => {
        this.incrematePage();
      });
  }

  incrematePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get value() {
    return this.searchValue;
  }

  set value(newValue) {
    this.searchValue = newValue;
  }
}
