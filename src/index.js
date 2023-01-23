import { PixabayAPI } from './getPhotos';
import { createGalleryCards } from './createGalleryCards';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabayAPI = new PixabayAPI();
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

//пошук зображень
function onSubmitForm(e) {
  e.preventDefault();
  pixabayAPI.query = e.target.elements.searchQuery.value.trim();
  pixabayAPI.page = 1;
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
      Notiflix.Notify.success(
        `Hooray! We found ${pixabayAPI.totalHits} images.`
      );
      galleryListEl.innerHTML = createGalleryCards(data);
      gallery.refresh();

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
      gallery.refresh();

      let photoCardsAll = document.querySelectorAll('.photo-card');

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      if (photoCardsAll.length === pixabayAPI.totalHits) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.dir(err));
}

// SimpleLightbox
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onGalleryImgClick(e) {
  e.preventDefault();
  const { target } = e;
  if (target.nodeName !== 'IMG') {
    return;
  }
}

// events
formEl.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onSubmitLoadMore);
galleryListEl.addEventListener('click', onGalleryImgClick);
