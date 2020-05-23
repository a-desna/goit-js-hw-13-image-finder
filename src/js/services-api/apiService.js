'use strict';
const baseUrl =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

export default {
  page: 1,
  query: '',
  autorization: '16691292-2f3f42c714dd5f594c7c8ab9b',
  fetchImages() {
    const requestParams = `q=${this.query}&page=${this.page}&per_page=12&key=${this.autorization}`;

    return fetch(baseUrl + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
