import './sass/main.scss';
import Fetch from './partials/apiService';
import galleryItems from './tempates/gallery.hbs';
const fetchF = new Fetch();
const refs = {
  searchForm: document.querySelector('.search'),
  containerGallery: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-button'),
};
console.log(refs.searchForm);

refs.searchForm.addEventListener('input', search);
refs.loadMoreButton.addEventListener('click', loadMore);

function search(e) {
  e.preventDefault();
  fetchF.query = e.target.value;
  console.log(fetchF.searchQuery);

  clearGallery();
  // как лучше? чтобы ---IF(...){}--- оставался в функции search(e)?
  if (e.target.value !== '') {
    renderItems(e);
  }
  // или чтобы ---IF(...{})--- забирала микро-функция renderItems?
  searchIsEmpty(e);

  console.log(fetchF.fetchGallery());
}
function loadMore() {
  fetchF.pageNumber += 1;
  console.log(fetchF.pageNumber);
  renderItems();
  refs.containerGallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
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
function searchIsEmpty(e) {
  if (e.target.value === '') {
    alert('Введите что-то');
  }
}
function renderItems(e) {
  fetchF.fetchGallery().then(items => {
    if (items.totalHits <= 0) {
      alert('пусто');
    }
    return appendSearchItems(items);
  });
}

// const element = document.querySelector('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
