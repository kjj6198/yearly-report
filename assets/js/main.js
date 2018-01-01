
import '../css/main.scss';
import Star from './Star';
import './overview';
import './canvas/ripple';
import './medium';
import './blog';
import './yaoya';
import './travel';

const landing = document.querySelector('.landing');

let num = 7;
if (window.innerWidth > 1500) {
  num = 15;
  for (let i = 0; i < num; i++) {
    new Star(landing).init();
  }
} else {
  for (let i = 0; i < num; i++) {
    new Star(landing).init();
  }
}


const stars = Array.from(document.querySelectorAll('canvas.star'));
window.addEventListener('scroll', e => {
  const scrollY = window.pageYOffset;
  stars.forEach(star => {
    const speed = parseInt(star.getAttribute('data-speed'), 10);
    star.style.transform = `translateY(-${scrollY / speed}px)`;
  });
});
