import { PixabayAPI } from './getPhotos';
import { createGalleryCards } from './createGalleryCards';

const pixabayAPI = new PixabayAPI();

const formEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');

function onSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();
  console.log(query);
  pixabayAPI
    .getPhotos(query)
    .then(data => {
      galleryListEl.innerHTML = createGalleryCards(data);
      console.log(data);
    })
    .catch(err => console.dir(err));
  //   console.log(data);
}

formEl.addEventListener('submit', onSubmit);
