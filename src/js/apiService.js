const KEY = '21785158-d7699e1d635f5d39ae805dbbd';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }

  async fetchArticles() {
    console.log(this);

    const URl = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchValue}&page=${this.page}&per_page=12&key=${KEY}`;

    try {
      const responce = await fetch(URl);

      const responceJson = await responce.json();
      const data = await responceJson.hits;
      this.incrematePage();
      return data;
    } catch (error) {
      throw error;
    }
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

//--------------------------------------------------------
//   fetchArticles() {
//     console.log(this);

//     const URl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchValue}&page=${this.page}&per_page=12&key=${KEY}`;

//     return fetch(URl)
//       .then(responce => responce.json())
//       .then(data => {
//         this.incrematePage();

//         return data.hits;
//       });
//   }
