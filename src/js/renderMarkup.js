export default function renderMarkup(data) {
  return data
    .map(
      data => `<a class="gallery-link" href="${data.largeImageURL}"><div class="photo-card">
<img width="450" height="300" src="${data.webformatURL}" title="${data.tags}" alt="${data.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${data.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${data.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${data.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${data.downloads}
      </p>
    </div>
  </div></a>`
    )
    .join('');
}