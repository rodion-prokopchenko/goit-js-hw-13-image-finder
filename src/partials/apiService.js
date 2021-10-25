const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';
const KEY = 'key=24010225-df2edab0854d9b7e4a5f74eca';
// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
export default class Fetch {
  constructor(searchQuery) {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  fetchGallery() {
    const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&${KEY}`;
    return fetch(url).then(response => response.json());
  }
  get(queary) {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
