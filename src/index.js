import './sass/main.scss';
import Fetch from './partials/apiService';
import galleryItems from './tempates/gallery.hbs';
const fetchF = new Fetch();
const refs = {
  searchForm: document.querySelector('.search'),
  containerGallery: document.querySelector('.gallery'),
};
console.log(refs.searchForm);

refs.searchForm.addEventListener('input', search);

function search(e) {
  e.preventDefault();
  fetchF.query = e.target.value;
  clearGallery();
  console.log(fetchF.searchQuery);
  if (e.target.value !== '') {
    fetchF.fetchGallery().then(items => {
      if (items.totalHits <= 0) {
        alert('пусто');
      }
      return appendSearchItems(items);
    });
  }

  console.log(fetchF.fetchGallery());
}

function clearGallery() {
  refs.containerGallery.innerHTML = '';
}
function createSearchItems(e) {
  return galleryItems(e);
}
function appendSearchItems(e) {
  refs.containerGallery.insertAdjacentHTML('beforeend', createSearchItems(e));
}
function searchEmpty(e) {
  if ((e = '')) {
  }
}
