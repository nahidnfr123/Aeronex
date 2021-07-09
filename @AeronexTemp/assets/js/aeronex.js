// Load all im ages after page load ....
function loadImages() {
    $.each($('img'), function () {
        if ($(this).attr('data-src')) {
            var source = $(this).data('src');
            $(this).attr('src', source);
            $(this).removeAttr('data-src');
        }
    });
}



// Sticky Navigation Bar.... //
window.onscroll = function () {
    StickyNavBar();
};


function StickyNavBar() {
    let navbar = document.getElementById("Header");
    let sticky = navbar.offsetTop+200;
    if ($(window).width() < 600) {
        if (window.pageYOffset > 80) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    } else {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
        } else if(window.pageYOffset <= sticky-200){
            navbar.classList.remove("sticky");
        }
    }

}
//  End   //








// Toggle mobile nav ...
var navMobile = $('#NavUl');
var navMenu = $('#NavMenu');
function toggleMenu (){
    navMenu.toggleClass('menu-active');
    navMobile.toggleClass('mobileNavShow');

    if($('body').hasClass('stop-scrolling')){
        $('body').removeClass('stop-scrolling');
    }
}

navMenu.on('click', () => {
    //if ($(document).scrollTop() < $(window).height()) {
    if (navMobile.hasClass('mobileNavShow') && $('#NavMenu').hasClass('menu-active')) {
        navMenu.removeClass('menu-active');
        navMobile.removeClass('mobileNavShow');
        $('body').removeClass('stop-scrolling');
    } 
    else {
        $('body').addClass('stop-scrolling');
        if($(document).scrollTop() >= 200){
            navMenu.addClass('menu-active');
            navMobile.addClass('mobileNavShow');
        }else{
            $('html, body').stop().animate({
                scrollTop: $('#Header').offset().top + 200
            }, 600, function () {
                navMenu.addClass('menu-active');
                navMobile.addClass('mobileNavShow');
            });
        }
    }
});

$('body').on('click', '.body-content', () => {
    if (navMobile.hasClass('mobileNavShow') && $('#NavMenu').hasClass('menu-active')) {
        toggleMenu();
    }
});

// Close and show mobile nav ... END ...







// ---------------------------- Oul Carousel Slider ----------------------//
function initiateSlider(){
    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.welcome-slides');
        welcomeSlider.owlCarousel({
            items: 1,
            loop: true,
            center: true,
            mouseDrag: true,
            touchDrag: true,
            dots: false,
            autoplay: true,

            rtl: false,
            autoplaySpeed: 1000,
            autoplayTimeout: 4000,
            smartSpeed: 600,
            nav: true,
            navText: [('<i class="fas fa-arrow-left"></i>'), ('<i class="fas fa-arrow-right"></i>')]
        })

        welcomeSlider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function () {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    $('.owl-prev').attr('data-hover', '');
    $('.owl-prev .fas').addClass('hoverMove');
    $('.owl-next').attr('data-hover', '');
    $('.owl-next .fas').addClass('hoverMove');
}





// var Scrollbar = window.Scrollbar;
// var options = {
//     'damping': 0.1,
//     'thumbMinSize': 10,
//     //'alwaysShowTracks': true,
//     'continuousScrolling': true,
// };
// Scrollbar.init(document.querySelector('.body-smoothScroll'), options);









StickyNavBar();
loadImages();
initiateSlider();



