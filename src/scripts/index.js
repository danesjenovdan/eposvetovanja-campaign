import u from 'umbrellajs';
import { debounce } from 'lodash-es';
import '../styles/index.css';

u('.js-evading-button').on('mouseover touchstart click', (event) => {
  event.preventDefault();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = (Math.random() * w - w / 2) * 0.8;
  const y = (Math.random() * h - h / 2) * 0.8;
  event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  event.currentTarget.blur();
});

u('a[href^="#"').on('click', (event) => {
  event.preventDefault();
  u(event.currentTarget.getAttribute('href')).scroll();
});

// chart hover
u('.pie-segment').on('mouseover', (event) => {
  event.currentTarget.style.fill = '#92c1cb';
});
u('.pie-segment').on('mouseout', (event) => {
  event.currentTarget.style.fill = '';
});

// carousel
(function carousel() {
  const indexes = u('#carousel .js-carousel-index');
  const firstImage = u('#carousel .js-carousel-images').children().first();
  const firstDesc = u('#carousel .js-carousel-descriptions').children().first();
  const count = indexes.length;
  let index = 0;

  firstImage.style.transition = 'margin-left 0.25s ease';
  firstDesc.style.transition = 'margin-left 0.25s ease';

  function change(next) {
    index = ((next % count) + count) % count;
    indexes.removeClass('bg-secondary');
    const el = u(indexes.nodes[index]);
    el.addClass('bg-secondary');
    firstImage.style.marginLeft = `-${u(firstImage).size().width * index}px`;
    firstDesc.style.marginLeft = `-${u(firstDesc).size().width * index}px`;
  }

  u('#carousel .js-carousel-prev').on('click', () => {
    change(index - 1);
  });
  u('#carousel .js-carousel-next').on('click', () => {
    change(index + 1);
  });
  u('#carousel .js-carousel-index').on('click', (event) => {
    const i = indexes.nodes.findIndex((n) => n === event.currentTarget);
    change(i);
  });

  window.onresize = debounce(() => {
    change(index);
  }, 250);
})();
