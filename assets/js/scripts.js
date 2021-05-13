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
  if ( $('.smooth-scroller').length ) {
    $('.smooth-scroller').on('click', function(e){
      e.preventDefault();
      let target = $( $(this).attr('href') ).offset().top;
      let dist = Math.abs($(window).scrollTop() - target);

      $([document.documentElement, document.body]).animate({
        scrollTop: target
      }, Math.min(1200, ((dist / 1200) * 1000)));
    }).on('keypress', handleKeypressADA);
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
}); // document ready end

/*
 * Window Resize
 ***************************/
$(window).resize(function(){
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  isMobile = ( windowWidth <= mobileBreakpoint );

}); // end window resize functions
