import { PixabayAPI } from './getPhotos';
import { createGalleryCards } from './createGalleryCards';

const pixabayAPI = new PixabayAPI();
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

//пошук зображень
function onSubmitForm(e) {
  e.preventDefault();
  pixabayAPI.query = e.target.elements.searchQuery.value.trim();
  pixabayAPI
    .getPhotos()
    .then(data => {
      if (data.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        e.target.reset();
        galleryListEl.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');

        return;
      }

      if (data.length >= 40) {
        loadMoreBtn.classList.remove('is-hidden');
      }
      galleryListEl.innerHTML = createGalleryCards(data);
      console.dir(data);
    })
    .catch(err => console.dir(err));
}

// load more
function onSubmitLoadMore(e) {
  pixabayAPI.page += 1;
  pixabayAPI
    .getPhotos()
    .then(data => {
      galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data));
    })
    .catch(err => console.dir(err));

  //   let counter = 40;
  //   let photoCardsAll = document.querySelectorAll('.photo-card');
  //   counter += photoCardsAll.length;

  //   if (counter === pixabayAPI.totalHits) {
  //     loadMoreBtn.classList.add('is-hidden');
  //   }
}

// events
formEl.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onSubmitLoadMore);
