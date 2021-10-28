import './sass/main.scss';
import Fetch from './partials/apiService';
import galleryItems from './tempates/gallery.hbs';
import debounce from 'lodash.debounce';
const fetchF = new Fetch();
const refs = {
  searchForm: document.querySelector('.search'),
  containerGallery: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-button'),
};
console.log(refs.searchForm);

refs.searchForm.addEventListener('input', debounce(search, 500));
refs.loadMoreButton.addEventListener('click', loadMore);

function search(e) {
  e.preventDefault();
  fetchF.query = e.target.value;

  clearGallery();
  // как лучше? чтобы ---IF(...){}--- оставался в функции search(e)?
  if (e.target.value !== '') {
    renderItems(e);
    unDisableLoadButton();
  }
  // или чтобы ---IF(...{})--- забирала микро-функция renderItems?
  searchIsEmpty(e);

  console.log(fetchF.fetchGallery());
  console.log(refs.containerGallery.children);
}
function loadMore() {
  fetchF.pageNumber += 1;
  console.log(fetchF.pageNumber);

  renderItems();
  console.log(refs.containerGallery.lastElementChild);
  setTimeout(scroll, 550);
}

function scroll() {
  refs.containerGallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function unDisableLoadButton() {
  refs.loadMoreButton.removeAttribute('disabled', true);
}

function disableLoadButton() {
  refs.loadMoreButton.setAttribute('disabled', true);
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

async function renderItems(e) {
  await fetchF.fetchGallery().then(items => {
    if (items.totalHits <= 0) {
      alert('пусто');
      disableLoadButton();
    }
    return appendSearchItems(items);
  });
}
