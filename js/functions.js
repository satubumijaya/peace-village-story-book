// Scroll Used

// var orgscroll = $(document).scrollTop(),
// switchcheck = false;

// $(document).ready(function () {
//   var myElement = $(".cross-top");
//   $(window).on("scroll", function () {
//     var st = $(this).scrollTop();
//     myElement.css({
//       opacity: 1 - st / 500,
//     });
//   });
// });

function fullscreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
$(function () {
    $('.navbar-right .navbar-toggle').click(function (e) {
        e.preventDefault();
        $('.navbar-right').toggleClass('expanded');
    });
    $('.fullscreen-toggle a').click(function (e) {
        e.preventDefault();
        fullscreen();
    });
    $('.submenu a').click(function (e) {
        $('.navbar-right .navbar-toggle').trigger('click');
    });
    fullpage_api.setAllowScrolling(false);

    $('#welcome-continue-btn').click(function (e) {
        e.preventDefault();
        $('#welcome').css('opacity', 0);

        const currentId = fullpage_api.getActiveSection().item.id;
        const idArr = currentId.split('-');

        if(idArr[0] === 'intr'){
            playAudio();
        }

        setTimeout(function(){
            $('#welcome').css('visibility', 'hidden');
            fullpage_api.setAllowScrolling(true);
        },700);
    });

    $(document).on('click', '#fullpage', function (e) {
        if($('.navbar-right').hasClass('expanded')){
            $('.navbar-right .navbar-toggle').trigger('click');
        }
    });
});

function playAudio(){
    $('#backsound').get(0).play();
    $('#play-backsound').addClass('play');
}

function pauseAudio() {
    $('#backsound').get(0).pause();
    $('#play-backsound').removeClass('play');
}
$('#play-backsound').click(function(){
    if($(this).hasClass('play')){
        pauseAudio();
    } else {
        playAudio();
    }
});


// const observerOptions = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.7,
// };

// function observerCallback(entries, observer) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       // fade in observed elements that are in view
//       entry.target.classList.replace("fadeOut", "fadeIn");
//     } else {
//       // fade out observed elements that are not in view
//       entry.target.classList.replace("fadeIn", "fadeOut");
//     }
//   });
// }

// const observer = new IntersectionObserver(observerCallback, observerOptions);

// const fadeElms = document.querySelectorAll(".fade");
// fadeElms.forEach((el) => observer.observe(el));

// Navigation Toggle
$(document).ready(function () {
    $('#nav-toggle > a').on('click', function (e) {
        e.preventDefault();
        $('.nav-item').toggleClass('open');
    });
});

// next and previous button

// var sections = $(".section");
// console.log(sections);
var i = 0;
var scrolto = 0;

function next() {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();
    window.scrollTo({
        top: scrollPos + windowHeight,
        behavior: 'smooth',
    });
}

function prev() {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();
    window.scrollTo({
        top: scrollPos - windowHeight,
        behavior: 'smooth',
    });
}

$('html').keydown(function (e) {
    if (e.which == '38') {
        prev();
    }
    if (e.which == '40') {
        next();
    }
});

$('.next').click(function (e) {
    e.preventDefault();
    next();
});

$('.prev').click(function (e) {
    e.preventDefault();
    prev();
});
