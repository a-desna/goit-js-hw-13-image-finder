'use strict';
import imagesService from './services-api/apiService';
import imageItemTemlate from '../templates/image-item.hbs';
import { notice, success, error } from './pnotify';
import basicLightbox from './basic-lightbox';

const debounce = require('lodash.debounce');

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.searchForm.addEventListener('input', debounce(searchFormHandler, 750));
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
refs.galleryList.addEventListener('click', basicLightbox);

function searchFormHandler(e) {
  e.preventDefault();
  const inputValue = e.target.value;

  if (inputValue === '') {
    clearList();
    return;
  }

  clearList();
  imagesService.resetPage();
  imagesService.searchQuery = inputValue;

  imagesService
    .fetchImages()
    .then(images => {
      if (images.length === 0) {
        error({
          text: 'Please enter a more specific query!',
        });
        return;
      }
      insertImagetItem(images);
    })
    .catch(error => {
      console.warn(error);
    });
}

function loadMoreBtnHandler() {
  imagesService.fetchImages().then(insertImagetItem).then(scroll);
}

function insertImagetItem(item) {
  const markupImages = imageItemTemlate(item);
  refs.galleryList.insertAdjacentHTML('beforeend', markupImages);
}

function clearList() {
  refs.galleryList.innerHTML = '';
}

function scroll() {
  window.scrollTo({
    top: window.innerHeight + window.scrollY,
    behavior: 'smooth',
  });
}
