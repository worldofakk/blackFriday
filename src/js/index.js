// Timer
(function(){
  let timerCallback = function() {
    let elementsToHide = document.querySelectorAll('.hide-on-promo-over');
    let elementsToShow = document.querySelectorAll('.show-on-promo-over');
    
    elementsToHide.forEach(function(element){
      element.classList.add('d-none');
    })

    elementsToShow.forEach(function(element){
      element.classList.remove('d-none');
    })
  }

  let timer = new Countdown({
    cont: document.querySelector('.timer'),
    date: Date.now() + 1000 * 60 * 2,
    outputTranslation: {
        day: 'Days',
        hour: 'Hours',
        minute: 'Minutes',
        second: 'Seconds',
    },
    endCallback: timerCallback,
    outputFormat: 'day|hour|minute|second',
  });

  document.addEventListener('DOMContentLoaded', function(){
    timer.start();
  })
})();


// Anchors
(function() {
  let anchorElements = document.querySelectorAll('[data-anchor-href]');

  function scrollTo(element,  duration) {
    var targetElement = document.querySelector('[data-anchor-target="'+ element.getAttribute('data-anchor-href') +'"]');
    var targetPosition = targetElement.offsetTop;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }

  anchorElements.forEach(function(element) {
    element.addEventListener('click', function(){
      scrollTo(element, 100)
    })
  })
  
})();


// Modal-navigation
(function() {
  let modalNavigation = {};
  let activeClass = 'd-block';
  let modal = document.querySelector('.modal-navigation');
  let openButton = document.querySelector('.header__burger__open-havigation');
  let closeButton = document.querySelector('.close-button');

  modalNavigation.open = function() {
    modal.classList.add(activeClass);


    
  }

  modalNavigation.close = function() {
    modal.classList.remove(activeClass);

  }

  openButton.addEventListener('click', modalNavigation.open);
  closeButton.addEventListener('click', modalNavigation.close);
})();


// Product-card text crop
(function() {
  let dots = {};

  dots.init = function(htmlElement, height) {
    new Dotdotdot(htmlElement, {
      height: height,
      truncate: "word"
    });
  }

  dots.initAll = function() {
    let productTitle = document.querySelectorAll('.product-card__top .product-card__title');
    let productDescription = document.querySelectorAll('.product-card__description');

    productTitle.forEach(function(element) {
      dots.init(element, 45,);
    })

    productDescription.forEach(function(element) {
      dots.init(element, 62);
    })
  }

  document.addEventListener('DOMContentLoaded', function(){
    dots.initAll();
  })

})();

