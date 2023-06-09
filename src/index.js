import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchData from './js/fetchdata';
import renderMarkup from './js/renderMarkup';

const lightbox = new SimpleLightbox('.gallery a');

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadBtnClick);

let formValue = '';

function onFormSubmit(evt) {
  evt.preventDefault();
  formValue = evt.target.elements.searchQuery.value.trim();
  if (formValue === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  fetchData(formValue)
    .then(data => {
      if (data.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.info(`Hooray! We found ${data.data.totalHits} images.`);
      let markup = renderMarkup(data.data.hits);

      gallery.innerHTML = markup;
      lightbox.refresh();
      loadBtn.style.display = 'block';
    })
    .catch(error => console.log(error.message));
}

function onLoadBtnClick() {
  fetchData(formValue).then(data => {
    if (data.data.hits.length === 0) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadBtn.style.display = 'none';
      return;
    }
    let markup = renderMarkup(data.data.hits);

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  });
}