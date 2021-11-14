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

$(function(){
  $('.navbar-right .navbar-toggle').click(function(){
    $('.navbar-right').toggleClass('expanded');
  });
})

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
  $("#nav-toggle").on('click', function () {
    $(".nav-item").toggleClass("open");
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

$("html").keydown(function (e) {
  if (e.which == "38") {
    prev();
  }
  if (e.which == "40") {
    next();
  }
});

$(".next").click(function (e) {
  e.preventDefault();
  next();
});

$(".prev").click(function (e) {
  e.preventDefault();
  prev();
});