import './sass/main.scss';
import Fetch from './partials/apiService';
const fetchF = new Fetch();
const refs = {
  searchForm: document.querySelector('.search'),
};
console.log(refs.searchForm);

refs.searchForm.addEventListener('input', search);

function search(e) {
  fetchF.query = e.target.value;
  console.log(fetchF.searchQuery);

  console.log(fetchF.fetchGallery());
}
