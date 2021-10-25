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
  console.log(fetchF.searchQuery);

  clearGallery();

  fetchF.fetchGallery().then(items => {
    return appendSearchItems(items);
  });
  console.log(fetchF.fetchGallery());
}

function clearGallery() {
  refs.containerGallery.textContent = '';
}

function createSearchItems(e) {
  return galleryItems(e);
}
function appendSearchItems(e) {
  refs.containerGallery.insertAdjacentHTML('beforeend', createSearchItems(e));
}
