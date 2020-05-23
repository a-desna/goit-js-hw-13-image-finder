import * as basicLightbox from 'basiclightbox';

export default function handleOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imgUrl = e.target.alt;
  const instance = basicLightbox.create(`
    <img src="${imgUrl}" width="1280" >
`);
  instance.show();
}
