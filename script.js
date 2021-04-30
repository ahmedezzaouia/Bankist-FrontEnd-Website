'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// selecting and deleting elements

const buuttons = document.getElementsByTagName('h2');

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.insertAdjacentHTML = `<div class="cookie-message">
// // we are cookie for learning that javasjahsas gh
// // <button class="btn--close-cookie">got it!</button>
// // </div>`;
// header.insertAdjacentHTML(
//   'beforeend',
//   `<div class="cookie-message">
// we are cookie for learning that javasjahsas gh
// <button class="btn--close-cookie">got it!</button>
// </div>`
// );

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', () => {
  // const sectonBounding = section1.getBoundingClientRect();
  // console.log('***************************');
  // console.log('pageXOffset : ' + window.pageXOffset);
  // console.log('pageYOffset : ' + window.pageYOffset);
  // console.log('dcumentClientHight :' + document.documentElement.clientHeight);
  // console.log('dcumentClientWidth :' + document.documentElement.clientWidth);
  // console.log(sectonBounding);
  // console.log(sectonBounding.left);
  // console.log(sectonBounding.top);
  // window.scrollTo({
  //   lef: sectonBounding.left,
  //   top: sectonBounding.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  // console.log('pageXOffset : ' + window.pageXOffset);
  // console.log('pageYOffset : ' + window.pageYOffset);

  section1.scrollIntoView('smooth');
});

/////////////////////////////////

const navLink = document.querySelectorAll('.nav__link');
navLink.forEach(el => {
  el.addEventListener('click', e => {});
});
navLink[0].closest('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  console.log('nav__links with closset');
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView('smooth');
  }
});

///////// tapped componnet
const tabsContainer = document.querySelector('.operations__tab-container');
tabsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('operations__tab')) {
    //add active to target button and operation
    e.target.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${e.target.dataset.tab}`)
      .classList.add('operations__content--active');
    /// remove active class from others
    [...tabsContainer.children].forEach(el => {
      if (el !== e.target) {
        el.classList.remove('operations__tab--active');
        document
          .querySelector(`.operations__content--${el.dataset.tab}`)
          .classList.remove('operations__content--active');
      }
    });
  }
});

// navigation effect
const nav = document.querySelector('.nav');
const logo = nav.querySelector('.nav__logo');
const siblings = nav.querySelectorAll('.nav__link');
nav.addEventListener('mouseover', e => {
  if (e.target.classList.contains('nav__link')) {
    e.target.style.opacity = 1;
    logo.style.opacity = 0.5;
    siblings.forEach(link => {
      if (link !== e.target) {
        link.style.opacity = 0.5;
      }
    });
  }
  if (e.target.classList.contains('nav__logo')) {
    logo.style.opacity = 1;
    siblings.forEach(link => {
      link.style.opacity = 0.5;
    });
  }
});
nav.addEventListener('mouseout', e => {
  logo.style.opacity = 1;
  siblings.forEach(link => {
    link.style.opacity = 1;
  });
});

logo.style.cursor = 'pointer';

// sticky nav

// window.addEventListener('scroll', () => {
//   // console.log(window.scrollY);
//   // if (window.scrollY > 70) {
//   //   nav.classList.add('sticky');
//   // } else {
//   //   nav.classList.remove('sticky');
//   // }
//   // console.log(section1.getBoundingClientRect());
// });
const navhieght = nav.getBoundingClientRect().height;
const headerCallBack = (entries, observer) => {
  !entries[0].isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};
const hederOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navhieght}px`,
};
const observer = new IntersectionObserver(headerCallBack, hederOptions);
observer.observe(header);

//reveal section

const allSections = document.querySelectorAll('.section');
const sectionCallBack = (entries, observer) => {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove('section--hidden');
    observer.unobserve(entries[0].target);
  }
};
const sectionOptions = {
  root: null,
  threshold: 0.15,
};

allSections.forEach(section => {
  const secObserver = new IntersectionObserver(sectionCallBack, sectionOptions);
  secObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy images
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyImgCallback = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
      observer.unobserve(entry.target);
    });
  }
};
const imgsOptions = { root: null, threshold: 0, rootMargin: '180px' };
const lazyImgObserver = new IntersectionObserver(lazyImgCallback, imgsOptions);
lazyImages.forEach(image => {
  lazyImgObserver.observe(image);
});

//slider implement
const slideContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');

let curSlide = 0;
const goToSlide = slide => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
const nextSlide = () => {
  if (curSlide === slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activeDot(curSlide);
};
const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = 0;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activeDot(curSlide);
};
const createDots = () => {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `
    <button class="dots__dot" data-slide="${i}"></button>
    `
    );
  });
};
const activeDot = slide => {
  const allDots = dotsContainer.querySelectorAll('.dots__dot');
  const activeDot = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
  activeDot.classList.add('dots__dot--active');
  allDots.forEach(dot => {
    if (dot !== activeDot) {
      dot.classList.remove('dots__dot--active');
    }
  });
};
const init = () => {
  goToSlide(0);
  createDots();
  activeDot(0);
};
init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', e => {
  e.key === 'ArrowRight' && nextSlide(curSlide);
  e.key === 'ArrowLeft' && prevSlide(curSlide);
});
dotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
  }
});

// event lifcyle
document.addEventListener('DOMContentLoaded', e => {
  console.log('doom is ready ');
  console.log(e);
});
window.addEventListener('load', e => {
  setTimeout(() => {
    alert('yes page is loaded');
  }, 5000);
});
