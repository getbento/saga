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
  /* Breakpoints */
    var isMobile = ( windowWidth <= mobileBreakpoint );
  /* Mobile Navigation */
    var isMenuOpen = false;

const handleKeypressADA = function() {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') return;
  $(this).trigger('click');
};

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
  /* END GENERIC SCRIPTS */

  /* Homepage */
  if ( $('.homepage__floors__list-item__link.has-bg').length ) {
    $('.homepage__floors__list-item__link.has-bg').each(function(index){
      $(this).on('mouseover', function(){
        $('.homepage__floors__hover__img').eq(index).addClass('active');
        $('.homepage__floors__list').addClass('active');
      });

      $(this).on('focus', function(){
        $('.homepage__floors__hover__img').eq(index).addClass('active');
        $('.homepage__floors__list').addClass('active');
      });

      $(this).on('mouseout', function(){
        $('.homepage__floors__hover__img').eq(index).removeClass('active');
        $('.homepage__floors__list').removeClass('active');
      });

      $(this).on('blur', function(){
        $('.homepage__floors__hover__img').eq(index).removeClass('active');
        $('.homepage__floors__list').removeClass('active');
      });
    });
  }
  /* END HOMEPAGE SCRIPTS */

  /* Gallery */
  if ( $('.bblock-gallery').length ) {
    $('.bblock-gallery').each(function(){
      const list = $(this).find('.bblock-gallery__list');
      const controls = $(this).find('.bblock-gallery__list__controls');
      list.slick({
        arrows: true,
        appendArrows: controls,
        swipe: false,
        speed: 900
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
  isMobile = ( windowWidth <= mobileBreakpoint );

}); // end window resize functions
