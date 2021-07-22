/*
 * Constants
 ***************************/
const mobileBreakpoint = 767;

/*
 * Globals
 ***************************/
  /* Window */
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var windowScrollHeight = document.querySelector('body').scrollHeight;
  /* Breakpoints */
    var isMobile = ( windowWidth <= mobileBreakpoint );
  /* Mobile Navigation */
    var isMenuOpen = false;

    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

const handleKeypressADA = function() {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') return;
  $(this).trigger('click');
};

$(window).on('load', function() {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  windowScrollHeight = document.querySelector('body').scrollHeight;
});

$(document).ready(function(){
  /* Menu */
  $('.pull-out__toggle').on('click', function(){
    isMenuOpen = !isMenuOpen;
    console.log(isMenuOpen);
    $(this).attr('aria-expanded', isMenuOpen);
    $(this).toggleClass('active');
    $('.pull-out, .pull-out__background').toggleClass('active');
  }).on('keypress', handleKeypressADA);

  $('.pull-out__nav__list-item__link').each(function(index){
    $(this).on('mouseover', function(){
      $('.pull-out__background__hover .pull-out__background__img').eq(index).addClass('active');
    });

    $(this).on('focus', function(){
      $('.pull-out__background__hover .pull-out__background__img').eq(index).addClass('active');
    });

    $(this).on('mouseout', function(){
      $('.pull-out__background__hover .pull-out__background__img').eq(index).removeClass('active');
    });

    $(this).on('blur', function(){
      $('.pull-out__background__hover .pull-out__background__img').eq(index).removeClass('active');
    });
  });
  /* END MENU SCRIPTS */

  /* Generic */
  if ( $('.modal-area').length ) {
    $('.modal-area').each(function(){
      const prop = $(this).data('propid');


      $(this).find('.modal-area__dismiss').on('click', function(){
        $(this).closest('.modal-area').removeClass('active');
        window.localStorage.setItem( prop, 'true' );
      }).on('keypress', handleKeypressADA);

      const element = $(this).get(0);

      $(this).on('click', function(e){
        if (e.target !== element && !element.contains(e.target)) {
          $(this).removeClass('active');
          window.localStorage.setItem( prop, 'true' );
        }
      });

      const modalDismissed = window.localStorage.getItem( prop );
      if ( modalDismissed != 'true' ) {
        const modal = $(this);
        setTimeout(function(){
          modal.addClass('active');
        }, $(this).data('delay'));
      }
    });
  }

  if ( $('.smooth-scroller').length ) { // internal links, smooth scrolling
    $('.smooth-scroller').on('click', function(e){
      e.preventDefault();
      let target = $( $(this).attr('href') ).offset().top;
      let dist = Math.abs($(window).scrollTop() - target);

      $([document.documentElement, document.body]).animate({
        scrollTop: target
      }, Math.min(1200, ((dist / 1200) * 1000)));
    }).on('keypress', handleKeypressADA);
  }

  if ( $('.fr-dib').length ) {
    $('.fr-dib').each(function(){
      $(this).wrap('<figure></figure');
      $(this).parent().attr('class', $(this).attr('class'));

      const img = $(this).is('img') ? $(this) : $(this).find('img');
      const caption = $(this).find('.fr-inner').length ? $(this).find('.fr-inner') : false;

      const figure = $(this).parent();
      figure.html('');

      figure.append(img);

      if ( caption ) {
        const figcaption = document.createElement('figcaption');
        $(figcaption).append(caption);
        figure.append(figcaption);
      }
    });
  }

  if ( $('.team-list__item.full').length ) {
    $('.team-list__item.full').each(function(){
      const thisRef = this;
      renderTeamBlockContent(this);
      $(window).on('resize', function(){
        renderTeamBlockContent(thisRef);
      });
    });
  }

  if ( $('.page-header__figure').length ) {
    if ( $(window).scrollTop() > 0 ) {
      $('.page-header__figure').css('transition', 'none');
      $('.page-header__figure').css('opacity', 0);
      $('.page-header__figure').addClass('scrolled');
      setTimeout(function(){
        $('.page-header__figure').css('transition', '');
        $('.page-header__figure').css('opacity', '');
      }, 100);
    }

    $(window).on('scroll', function(){
      if ( $(window).scrollTop() > 0 ) {
        $('.page-header__figure').addClass('scrolled');
      } else {
        $('.page-header__figure').removeClass('scrolled');
      }
    });
  }
  /* END GENERIC SCRIPTS */

  /* Homepage */
  if ( $('.homepage__floors__list-item__link.has-bg').length ) {
    $('.homepage__floors__list-item__link.has-bg').each(function(index){
      $(this).on('mouseover', function(){
        if ( !isMobile ) {
          $('.homepage__floors__hover__img').eq(index).addClass('active');
          $('.homepage__floors__list').addClass('active');
        }
      });

      $(this).on('focus', function(){
        if ( !isMobile ) {
          $('.homepage__floors__hover__img').eq(index).addClass('active');
          $('.homepage__floors__list').addClass('active');
        }
      });

      $(this).on('mouseout', function(){
        if ( !isMobile ) {
          $('.homepage__floors__hover__img').eq(index).removeClass('active');
          $('.homepage__floors__list').removeClass('active');
        }
      });

      $(this).on('blur', function(){
        if ( !isMobile ) {
          $('.homepage__floors__hover__img').eq(index).removeClass('active');
          $('.homepage__floors__list').removeClass('active');
        }
      });
    });
  }

  if ( $('.homepage-building-scroll').length ) {
    $(window).on('scroll', function(){
      const scrollPer = ( (windowScrollHeight - windowHeight) - $(window).scrollTop()) / (windowScrollHeight - windowHeight);
      $('.homepage-building-scroll__sizer').css('width', (scrollPer * 100) + '%' );
      $('.homepage-building-scroll__floor-num').text( pad('' + (Math.floor(scrollPer * 65) + 1), 2) );
    });
  }
  /* END HOMEPAGE SCRIPTS */

  /* Dining Landing */
  if ( $('.dining-landing').length ) {
    $('.dining-landing__right__list').slick({
      arrows: false,
      swipe: false,
      fade: true
    });

    $('.dining-landing__left__list-item__link').each(function(index){
      $(this).on('mouseover', function(){
        if ( !$(this).hasClass('active') ) {
          $('.dining-landing__left__list-item__link').removeClass('active');
          $(this).addClass('active');
          $('.dining-landing__right__list').slick('slickGoTo', index);
        }
      });
    });
  }
  /* END DINING SCRIPTS */

  /* Gallery */
  if ( $('.bblock-gallery').length ) {
    $('.bblock-gallery').each(function(){
      const list = $(this).find('.bblock-gallery__list');
      const controls = $(this).find('.bblock-gallery__list__controls');
      const page = $(this).find('.bblock-gallery__list__controls__page-current');
      list.slick({
        arrows: true,
        appendArrows: controls,
        swipe: false,
        speed: 900,
        prevArrow: '<button type="button" class="slick-prev bblock-gallery__list__button"><span class="screen-reader-text">Previous</span></button>',
        nextArrow: '<button type="button" class="slick-next bblock-gallery__list__button"><span class="screen-reader-text">Next</span></button>'
      });

      list.on('beforeChange',  function(event, slick, currentSlide, nextSlide){
        page.text(nextSlide + 1);
      });
    });
  }
  /* END GALLERY SCRIPTS */
}); // document ready end

/*
 * Window Resize
 ***************************/
$(window).resize(function(){
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  windowScrollHeight = document.querySelector('body').scrollHeight;
  isMobile = ( windowWidth <= mobileBreakpoint );

}); // end window resize functions

/*
 * Functions
 ***************************/
 // team block content hider
 function renderTeamBlockContent(block) {
   $(block).removeClass('has-toggle');
   $(block).find('.team-list__item__expander__container').remove();
   const info = $(block).find('.team-list__item__info');
   const figure = $(block).find('.team-list__item__figure');

   if ( info.height() > (isMobile ? 185 : figure.height()) ) {
     const oldheight = info.height();
     $(block).addClass('has-toggle');
     info.css('height', (isMobile ? 185 : figure.height()) + 'px');
     info.html(info.html() + '<div class="team-list__item__expander__container"><button class="team-list__item__expander">Click to expand</button></div>');
     info.find('.team-list__item__expander').on('click', function(){
       info.find('.team-list__item__expander__container').fadeOut(400);
       info.animate({
         'height': oldheight
       }, 600, function(){
         $(block).removeClass('has-toggle');
         info.find('.team-list__item__expander__container').remove();
       });
     }).on('keypress', handleKeypressADA);
   }
 }

 function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
