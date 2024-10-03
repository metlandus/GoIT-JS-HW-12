import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let page = 1;
const perPage = 40;
let totalHits = 0;
let apiKey = '19490895-43525fbfea01be26fe968a218';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
    page++;
    await fetchImages();

    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    const scroll = document.querySelector(".gallery-item").getBoundingClientRect().height * 2;
    window.scrollBy({
        left: 0,
        top: scroll * 2,
        behavior: 'smooth'
    });

    loader.remove();
});

async function fetchImages() {
    const query = document.getElementById('search').value;
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        gallery.innerHTML += '<div class="loader"></div>';
        const response = await axios.get(apiUrl);
        const data = await response.data;

        if (data.hits.length > 0) {
            document.querySelector('.loader').remove();
            totalHits = data.totalHits;
            displayImages(data.hits);

            const lightbox = new SimpleLightbox('#gallery a');
            lightbox.refresh();

            if (gallery.children.length >= totalHits) {
                loadMoreBtn.style.display = 'none';
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results",
                    messageSize: 14,
                    messageColor: "#333333",
                    position: "bottomLeft",
                });
            } else {
                loadMoreBtn.style.display = 'block';
            }

        } else {
            iziToast.error({
                title: 'No Results',
                message: 'No images found for your search. Please try another keyword.',
            });
            document.querySelector('.loader').remove();
        }
    } catch (error) {
        console.error('Error fetching images:', error);

        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again.',
        });
    }
}

function displayImages(images) {
    images.forEach(image => {
        gallery.innerHTML += `
            <li class="gallery-item">
                <a class="gallery-link" href="${image.largeImageURL}">
                    <img class="gallery-image" src="${image.largeImageURL}" alt="${image.tags}" title="${image.tags}">
                </a>
                <div class="image-captions">
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Views</p>
                        <p class="img-caption-value">${image.views}</p>
                    </div>
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Downloads</p>
                        <p class="img-caption-value">${image.downloads}</p>
                    </div>
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Likes</p>
                        <p class="img-caption-value">${image.likes}</p>
                    </div>
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Comments</p>
                        <p class="img-caption-value">${image.comments}</p>
                    </div>
                </div>
            </li>
        `;
    });
}