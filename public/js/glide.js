const config = {
  autoplay: 2000,
  hoverpause: true,
};

const carousel = {
  type: "carousel",
  startAt: 0,
  perView: 3,
  gap: 0,
  autoplay: 2000,
  hoverpause: true,
};
const carousel_mobile = {
  startAt: 0,
  perView: 1,
  gap: 0,
  autoplay: 1500,
  hoverpause: true,
};

new Glide(".glide", config).mount();
new Glide(".carousel-glide", carousel).mount();
new Glide(".carousel-mobile-glide", carousel_mobile).mount();
