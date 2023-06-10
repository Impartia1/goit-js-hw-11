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

// loadBtn.classList.add('is-hidden')


async function onFormSubmit(evt) {
  evt.preventDefault();
  loadBtn.classList.add('is-hidden')
  formValue = evt.target.elements.searchQuery.value.trim();
  if (formValue === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    
    return;
  }
  try {
    const data = await fetchData(formValue);
    if (data.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
      return;
    }
    Notify.info(`Hooray! We found ${data.data.totalHits} images.`);
    let markup = renderMarkup(data.data.hits);

    gallery.innerHTML = markup;
    lightbox.refresh();

    if (data.data.totalHits > 40) {
      loadBtn.classList.remove('is-hidden');
    }
    
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadBtnClick() {
  try {
    const data = await fetchData(formValue);
    if (data.data.hits.length >= 0 && data.data.hits.length < 40) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadBtn.style.display = 'none';
      let markup = renderMarkup(data.data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
      const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      return;
    }
    let markup = renderMarkup(data.data.hits);

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
  }
}

// function onLoadBtnClick() {
//   fetchData(formValue).then(data => {
//     if (data.data.hits.length >= 0 && data.data.hits.length < 40) {
//       Notify.info("We're sorry, but you've reached the end of search results.");
//       loadBtn.style.display = 'none';
//       let markup = renderMarkup(data.data.hits);
//       gallery.insertAdjacentHTML('beforeend', markup);
//       lightbox.refresh();
//       const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//       return;
//     }
//     let markup = renderMarkup(data.data.hits);

//     gallery.insertAdjacentHTML('beforeend', markup);
//     lightbox.refresh();
//     const { height: cardHeight } = document
//       .querySelector('.gallery')
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   });
// }