import u from 'umbrellajs';
import { debounce } from 'lodash-es';
import '../styles/index.css';

// polyfills
if (!Array.prototype.findIndex) {
  const script = document.createElement('script');
  script.src =
    'https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.findIndex';
  document.body.appendChild(script);
}

// fix 100vh on mobile
const fixHeights = debounce(() => {
  u('.h-screen').each((el) => {
    el.style.height = `${window.innerHeight}px`;
  });
}, 250);

fixHeights();
u([window]).on('resize', fixHeights);

// evading button
u('.js-evading-button').on('mouseover touchstart click', (event) => {
  event.preventDefault();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = (Math.random() * w - w / 2) * 0.8;
  const y = (Math.random() * h - h / 2) * 0.8;
  event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  event.currentTarget.blur();
});

// smooth scroll links
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

  u([window]).on(
    'resize',
    debounce(() => {
      change(index);
    }, 250),
  );
})();

// social buttons
(function socials() {
  const icons = {
    tw:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="w-8 h-6 mx-3"><path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5T1369.5 1125 1185 1335.5t-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5T285 1033q33 5 61 5 43 0 85-11-112-23-185.5-111.5T172 710v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5T884 653q-8-38-8-74 0-134 94.5-228.5T1199 256q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path></svg>',
    mail:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 333" class="w-8 h-6 mx-3" fill-rule="evenodd"><path d="M8 126l50-33V53h61l44-29c3-2 5-2 8 0l44 29h60v40l50 33v179c0 3-2 5-5 5H14c-3 0-6-2-6-5V126zm104-24h107c12 0 12 18 0 18H112c-11 0-11-18 0-18zm0 39h107c12 0 12 18 0 18H112c-11 0-11-18 0-18zM76 71h180v88l-60 43-25-19c-1-1-4-3-5-3-2 0-4 2-6 3l-24 19-60-43V71zm108-17l-16-13c-3-2-2-2-5 0l-15 13h36zm115 77l-26-15v32l26-17zm-266 0l25-15v32l-25-17z"></path></svg>',
    fb:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="w-8 h-6 mx-3"><path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759H734V905H479V609h255V391q0-186 104-288.5T1115 0q147 0 228 12z"></path></svg>',
  };

  u('.js-social-button').on('click', (event) => {
    const el = u(event.currentTarget);
    const party = el.data('party');
    const replaced = el.replace(`
      <div class="flex mx-auto bg-primary border-2 border-black font-medium text-sm sm:text-xl py-1 px-2 sm:py-2 sm:px-4 divide-x divide-black">
        <button class="hover:opacity-50 js-social-icon" data-type="fb">${icons.fb}</button>
        <button class="hover:opacity-50 js-social-icon" data-type="tw">${icons.tw}</button>
        <button class="hover:opacity-50 js-social-icon" data-type="mail">${icons.mail}</button>
      </div>
    `);

    replaced.on('click', '.js-social-icon', (evt) => {
      const ic = u(evt.currentTarget);
      console.log('hello!', ic.data('type'), party);
    });
  });
})();
