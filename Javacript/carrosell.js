// const state = {}; // not used

const carouselList = document.querySelector('.gallery');
const carouselItems = document.querySelectorAll('.gallery_item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
  const isItem = event.target.closest('.gallery_item');
  if (!isItem) return; // clicked outside a slide
  if (isItem.classList.contains('carousel__item_active')) return;
  update(isItem);
});

function update(newActiveEl) {
  const newActivePos = Number(newActiveEl.dataset.pos);

  const current = elems.find(el => Number(el.dataset.pos) === 0);
  const prev    = elems.find(el => Number(el.dataset.pos) === -1);
  const next    = elems.find(el => Number(el.dataset.pos) === 1);
  const first   = elems.find(el => Number(el.dataset.pos) === -2);
  const last    = elems.find(el => Number(el.dataset.pos) === 2);

  if (current) current.classList.remove('carousel__item_active');
  newActiveEl.classList.add('carousel__item_active');

  [current, prev, next, first, last].forEach(el => {
    if (!el) return;
    const itemPos = Number(el.dataset.pos);
    el.dataset.pos = String(getPos(itemPos, newActivePos));
  });
}

function getPos(current, active) {
  const diff = current - active;
  // ring wrap for -2..2
  if (Math.abs(diff) > 2) return -current;
  return diff;
}

// (Optional) Buttons
const prevBtn = document.querySelector('.button-previous');
const nextBtn = document.querySelector('.button-forward');

prevBtn?.addEventListener('click', () => {
  const prev = elems.find(el => Number(el.dataset.pos) === -1);
  if (prev) update(prev);
});

nextBtn?.addEventListener('click', () => {
  const next = elems.find(el => Number(el.dataset.pos) === 1);
  if (next) update(next);
});
