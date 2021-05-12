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

$(document).ready(function(){
  /* Menu */
  $('.pull-out__toggle').on('click', function(){
    isMenuOpen = !isMenuOpen;
    console.log(isMenuOpen);
    $(this).attr('aria-expanded', isMenuOpen);
    $(this).toggleClass('active');
    $('.pull-out, .pull-out__background').toggleClass('active');
  }).on('keypress', function(){
    $(this).trigger('click');
  });

  $('.pull-out__nav__list-item__link').each(function(index){
    $(this).on('mouseover', function(){
      $('.pull-out__background__hover .pull-out__background__img').eq(index).addClass('active');
    });

    $(this).on('mouseout', function(){
      $('.pull-out__background__hover .pull-out__background__img').eq(index).removeClass('active');
    });
  });
}); // document ready end

/*
 * Window Resize
 ***************************/
$(window).resize(function(){
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  isMobile = ( windowWidth <= mobileBreakpoint );

}); // end window resize functions
