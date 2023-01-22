import { getPhotos } from './getPhotos';
import { PixabayAPI } from './getPhotos';

const pixabayAPI = new PixabayAPI();

const formEl = document.querySelector('.search-form');

function onSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();
  console.log(query);
  pixabayAPI
    .getPhotos(query)
    .then(data => console.log(data))
    .catch(err => console.dir(err));
  //   console.log(data);
}

formEl.addEventListener('submit', onSubmit);
