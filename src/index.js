import { getPhotos } from './getPhotos';
import { PixabayAPI } from './getPhotos';

const pixabayAPI = new PixabayAPI();
console.log(pixabayAPI);

pixabayAPI.getPhotos('cat').then(data => console.log(data));

// const formEl = document.querySelector('.search-form');

// function onSubmit(e) {
//   e.preventDefault();
//   const query = e.target.elements.searchQuery.value;
//   console.log(query);
//   getPhotos(query).then(console.log);
//   //   console.log(data);
// }

// formEl.addEventListener('submit', onSubmit);
