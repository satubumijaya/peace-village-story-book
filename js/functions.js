// (function ($) {
//   var types = ["DOMMouseScroll", "mousewheel"];

//   if ($.event.fixHooks) {
//     for (var i = types.length; i; ) {
//       $.event.fixHooks[types[--i]] = $.event.mouseHooks;
//     }
//   }

//   $.event.special.mousewheel = {
//     setup: function () {
//       if (this.addEventListener) {
//         for (var i = types.length; i; ) {
//           this.addEventListener(types[--i], handler, false);
//         }
//       } else {
//         this.onmousewheel = handler;
//       }
//     },

//     teardown: function () {
//       if (this.removeEventListener) {
//         for (var i = types.length; i; ) {
//           this.removeEventListener(types[--i], handler, false);
//         }
//       } else {
//         this.onmousewheel = null;
//       }
//     },
//   };

//   $.fn.extend({
//     mousewheel: function (fn) {
//       return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
//     },

//     unmousewheel: function (fn) {
//       return this.unbind("mousewheel", fn);
//     },
//   });

//   function handler(event) {
//     var orgEvent = event || window.event,
//       args = [].slice.call(arguments, 1),
//       delta = 0,
//       returnValue = true,
//       deltaX = 0,
//       deltaY = 0;
//     event = $.event.fix(orgEvent);
//     event.type = "mousewheel";

//     // Old school scrollwheel delta
//     if (orgEvent.wheelDelta) {
//       delta = orgEvent.wheelDelta / 120;
//     }
//     if (orgEvent.detail) {
//       delta = -orgEvent.detail / 3;
//     }

//     // New school multidimensional scroll (touchpads) deltas
//     deltaY = delta;

//     // Gecko
//     if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
//       deltaY = 0;
//       deltaX = -1 * delta;
//     }

//     // Webkit
//     if (orgEvent.wheelDeltaY !== undefined) {
//       deltaY = orgEvent.wheelDeltaY / 120;
//     }
//     if (orgEvent.wheelDeltaX !== undefined) {
//       deltaX = (-1 * orgEvent.wheelDeltaX) / 120;
//     }

//     // Add event and delta to the front of the arguments
//     args.unshift(event, delta, deltaX, deltaY);

//     return ($.event.dispatch || $.event.handle).apply(this, args);
//   }
// });

// // OUR CODE

// var winH = window.innerHeight;
// $(".section").height(winH);

// var c = 0;
// var sectionsN = $(".section").length;
// var canScroll = true;

// $(document).bind("mousewheel", function (ev, delta) {
//   ev.preventDefault();
//   if (!canScroll) return;
//   delta > 0 ? --c : ++c;
//   if (c === -1) {
//     c = 0;
//   } else if (c === sectionsN) {
//     c = sectionsN - 1;
//   }
//   canScroll = false;
//   var sectionPos = $(".section").eq(c).position().top;
//   $("html, body")
//     .stop()
//     .animate({ scrollTop: sectionPos }, 700, function () {
//       canScroll = true;
//     });
//   return false;
// });

// scrollify

// $.scrollify({
//   section: ".section",
//   sectionName: "section-name",
//   interstitialSection: "",
//   easing: "easeOutCubic",
//   scrollSpeed: 2000,
//   offset: 0,
//   scrollbars: false,
//   standardScrollElements: "",
//   setHeights: true,
//   overflowScroll: true,
//   updateHash: true,
//   touchScroll: true,
//   before: function () {},
//   after: function () {},
//   afterResize: function () {},
//   afterRender: function () {},
// });

// $("#first-st-2").click(function () {
//   $.scrollify.next();
// });

// $("#first-st-2").click(function () {
//   $.scrollify.move("#3");
// });

// var onesec = document.getElementById("intr-1");
// var twosec = document.getElementById("intr-2");
// var treesec = document.getElementById("intr-3");
// document.onscroll = function scroll() {
//   secondsec.scrollIntoView({ behavior: "smooth" });
// };

AOS.init();
$(function () {
  AOS.init();
});

// const aosAnimation = document.querySelectorAll(".aos");
// observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.intersectionRatio > 0) {
//       entry.target.classList.add("aos-animate");
//     } else {
//       entry.target.classList.remove("aos-animate");
//     }
//   });
// });

// aosAnimation.forEach((aosObject) => {
//   observer.observe(aosObject);
// });

// document.body.onscroll = function (e) {
//   var position = window.scrollY;
//   console.log(position);
// };

//new WOW().init();
// $(document).ready(function () {
//   var scrollDiv = $(".container");
//   var target = $(".toAnimate");
//   var scrollDivHeight = $(".container").height();

//   var targetTop = target.offset().top;
//   var scrollDivTop = scrollDiv.offset().top;

//   var toScroll = targetTop - scrollDivTop - scrollDivHeight; // scroll to see element
//   var addToClass = target.attr("data-animation");
//   var visibleClass = "visible";
//   console.log("scrollDivHeight: " + scrollDivHeight);
//   console.log("targetTop: " + targetTop);
//   console.log("toScroll: " + toScroll);
//   console.log("addToClass: " + addToClass);

//   scrollDiv.scroll(function () {
//     var scrolled = $(this).scrollTop();
//     console.log("scrolled : " + scrolled);
//     if (scrolled > toScroll) {
//       target.addClass(visibleClass).addClass(addToClass);
//       console.log('"' + addToClass + '" has been added!');
//     } else {
//       target.removeClass(visibleClass).removeClass(addToClass);
//     }
//   });
// });

// Scroll Used

var orgscroll = $(document).scrollTop(),
  switchcheck = false;

function autoScroll() {
  // if(scrollable){
  if (switchcheck) return;
  switchcheck = true;
  console.log("test");

  var scroll = $(this).scrollTop();
  // scrollable=false;

  if (scroll > orgscroll) {
    if (scroll < $("#intr-1").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-1").offset().top }, "slow");
    }

    // else if (scroll > $("#intr-1").offset().top && scroll < $("#intr-1").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#intr-2").offset().top }, "slow");
    // }
    else if (scroll > $("#intr-1").offset().top && scroll < $("#intr-2").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-2").offset().top }, "slow");
    } else if (scroll > $("#intr-2").offset().top && scroll < $("#intr-3").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-3").offset().top }, "slow");
    } else if (scroll > $("#intr-3").offset().top && scroll < $("#intr-4").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-4").offset().top }, "slow");
    } else if (scroll > $("#intr-4").offset().top && scroll < $("#intr-5").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-5").offset().top }, "slow");
    } else if (scroll > $("#intr-5").offset().top && scroll < $("#intr-6").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-6").offset().top }, "slow");
    } else if (scroll > $("#intr-6").offset().top && scroll < $("#intr-7").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-7").offset().top }, "slow");
    } else if (scroll > $("#intr-7").offset().top && scroll < $("#intr-8").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-8").offset().top }, "slow");
    } else if (scroll > $("#intr-8").offset().top && scroll < $("#intr-9").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-9").offset().top }, "slow");
    } else if (scroll > $("#intr-9").offset().top && scroll < $("#intr-10").offset().top) {
      $("html, body").animate({ scrollTop: $("#intr-10").offset().top }, "slow");
    }
    // else if (scroll > $("#intr-10").offset().top && scroll < $("#intr-11").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#intr-11").offset().top }, "slow");
    // } else if (scroll > $("#intr-11").offset().top && scroll < $("#intr-12").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#intr-12").offset().top }, "slow");
    // } else if (scroll > $("#intr-12").offset().top && scroll < $("#intr-13").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#intr-13").offset().top }, "slow");
    // } else if (scroll > $("#intr-13").offset().top && scroll < $("#st-1-1").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#st-1-1").offset().top }, "slow");
    // }
    else if (scroll > $("#st-1-1").offset().top && scroll < $("#st-1-2").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-2").offset().top }, "slow");
    } else if (scroll > $("#st-1-2").offset().top && scroll < $("#st-1-3").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-3").offset().top }, "slow");
    } else if (scroll > $("#st-1-3").offset().top && scroll < $("#st-1-4").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-4").offset().top }, "slow");
    } else if (scroll > $("#st-1-4").offset().top && scroll < $("#st-1-5").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-5").offset().top }, "slow");
    } else if (scroll > $("#st-1-5").offset().top && scroll < $("#st-1-6").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-6").offset().top }, "slow");
    } else if (scroll > $("#st-1-6").offset().top && scroll < $("#st-1-7").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-7").offset().top }, "slow");
    } else if (scroll > $("#st-1-7").offset().top && scroll < $("#st-1-8").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-8").offset().top }, "slow");
    } else if (scroll > $("#st-1-8").offset().top && scroll < $("#st-1-9").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-9").offset().top }, "slow");
    } else if (scroll > $("#st-1-9").offset().top && scroll < $("#st-1-10").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-10").offset().top }, "slow");
    } else if (scroll > $("#st-1-10").offset().top && scroll < $("#st-1-11").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-11").offset().top }, "slow");
    } else if (scroll > $("#st-1-11").offset().top && scroll < $("#st-1-12").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-12").offset().top }, "slow");
    } else if (scroll > $("#st-1-12").offset().top && scroll < $("#st-1-13").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-1-13").offset().top }, "slow");
    }
    // st-2
    else if (scroll > $("#st-1-13").offset().top && scroll < $("#st-2-1").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-1").offset().top }, "slow");
    } else if (scroll > $("#st-2-1").offset().top && scroll < $("#st-2-2").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-2").offset().top }, "slow");
    } else if (scroll > $("#st-2-2").offset().top && scroll < $("#st-2-3").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-3").offset().top }, "slow");
    } else if (scroll > $("#st-2-3").offset().top && scroll < $("#st-2-4").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-4").offset().top }, "slow");
    } else if (scroll > $("#st-2-4").offset().top && scroll < $("#st-2-5").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-5").offset().top }, "slow");
    } else if (scroll > $("#st-2-5").offset().top && scroll < $("#st-2-6").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-6").offset().top }, "slow");
    } else if (scroll > $("#st-2-6").offset().top && scroll < $("#st-2-7").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-7").offset().top }, "slow");
    } else if (scroll > $("#st-2-7").offset().top && scroll < $("#st-2-8").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-8").offset().top }, "slow");
    } else if (scroll > $("#st-2-8").offset().top && scroll < $("#st-2-9").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-9").offset().top }, "slow");
    } else if (scroll > $("#st-2-9").offset().top && scroll < $("#st-2-10").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-10").offset().top }, "slow");
    } else if (scroll > $("#st-2-10").offset().top && scroll < $("#st-2-11").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-11").offset().top }, "slow");
    } else if (scroll > $("#st-2-11").offset().top && scroll < $("#st-2-12").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-12").offset().top }, "slow");
    } else if (scroll > $("#st-2-12").offset().top && scroll < $("#st-2-13").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-13").offset().top }, "slow");
    } else if (scroll > $("#st-2-13").offset().top && scroll < $("#st-2-14").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-2-14").offset().top }, "slow");
    } else if (scroll > $("#st-2-14").offset().top && scroll < $("#st-3-1").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-1").offset().top }, "slow");
    }

    // st-3
    else if (scroll > $("#st-3-1").offset().top && scroll < $("#st-3-2").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-2").offset().top }, "slow");
    } else if (scroll > $("#st-3-2").offset().top && scroll < $("#st-3-3").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-3").offset().top }, "slow");
    } else if (scroll > $("#st-3-3").offset().top && scroll < $("#st-3-4").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-4").offset().top }, "slow");
    } else if (scroll > $("#st-3-4").offset().top && scroll < $("#st-3-5").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-5").offset().top }, "slow");
    } else if (scroll > $("#st-3-5").offset().top && scroll < $("#st-3-6").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-6").offset().top }, "slow");
    } else if (scroll > $("#st-3-6").offset().top && scroll < $("#st-3-7").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-7").offset().top }, "slow");
    } else if (scroll > $("#st-3-7").offset().top && scroll < $("#st-3-10").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-10").offset().top }, "slow");
    } else if (scroll > $("#st-3-10").offset().top && scroll < $("#st-3-11").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-12").offset().top }, "slow");
    } else if (scroll > $("#st-3-12").offset().top && scroll < $("#st-3-13").offset().top) {
      $("html, body").animate({ scrollTop: $("#st-3-13").offset().top }, "slow");
    }
    // else if (scroll > $("#st-3-13").offset().top && scroll < $("#close-1").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#close-1").offset().top }, "slow");
    // } else if (scroll > $("#st-close-1").offset().top && scroll < $("#close-2").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#close-2").offset().top }, "slow");
    // }

    // } else if (scroll > $("#st-3-12").offset().top && scroll < $("#st-3-13").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#st-3-13").offset().top }, "slow");
    // } else if (scroll > $("#st-3-13").offset().top && scroll < $("#close-1").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#close-1").offset().top }, "slow");
    // } else if (scroll > $("#close-1").offset().top && scroll < $("#close-2").offset().top) {
    //   $("html, body").animate({ scrollTop: $("#close-2").offset().top }, "slow");
    // }

    orgscroll = scroll;
  } else if (scroll < orgscroll) {
    // alert("I'm scroll up");
    // switchcheck = true;
    // console.log("bottom");
  }
  setTimeout(function () {
    switchcheck = false;
  }, 1000);
}

// $(window).on("scroll", autoScroll);
// $("html, body").animate(
//   {
//     scrollTop: 0,
//   },
//   1000
// );

// var lastScrollTop = 0;
// var recentScroll = false;
// $(document).ready(function () {
//   $(window).on("scroll", function (event) {
//     var strActiveId = $(".active").attr("id");
//     var st = $(window).scrollTop();

//     if (!recentScroll && st > 0) {
//       // var st = $(this).scrollTop();
//       // console.log(strActiveId);

//       var activeId = parseInt(strActiveId.replace("intr-", ""));

//       console.log(lastScrollTop, st);
//       var newId = "intr-1";

//       if (st > lastScrollTop) {
//         // downscroll
//         newId = "intr-" + (activeId + 1);
//       } else {
//         // upscroll
//         if (activeId > 1) newId = "intr-" + (activeId - 1);
//       }
//       $("#" + strActiveId).removeClass("active");
//       $("#" + newId).addClass("active");

//       console.log(strActiveId, newId);

//       // $(window).off("scroll");
//       $("html, body").animate(
//         {
//           scrollTop: $("#" + newId).offset().top,
//         },
//         1000
//       );
//       lastScrollTop = $("#" + newId).scrollTop();

//       recentScroll = true;
//       window.setTimeout(() => {
//         recentScroll = false;
//       }, 2000);
//     }
//   });
// });

// Crossfade

// const checkpoint = 300;

// window.addEventListener("scroll", () => {
//   const currentScroll = window.pageYOffset;
//   if (currentScroll <= checkpoint) {
//     opacity = 1 - currentScroll / checkpoint;
//   } else {
//     opacity = 0;
//   }
//   document.querySelector(".cross-top").style.opacity = opacity;
// });

$(document).ready(function () {
  var myElement = $(".cross-top");
  $(window).on("scroll", function () {
    var st = $(this).scrollTop();
    myElement.css({
      opacity: 1 - st / 500,
    });
  });
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // fade in observed elements that are in view
      entry.target.classList.replace("fadeOut", "fadeIn");
    } else {
      // fade out observed elements that are not in view
      entry.target.classList.replace("fadeIn", "fadeOut");
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

const fadeElms = document.querySelectorAll(".fade");
fadeElms.forEach((el) => observer.observe(el));

// Navigation Toggle
$(document).ready(function () {
  $("#nav-toggle").click(function () {
    $(".nav-item").toggleClass("open");
  });
});

// next and previous button

var sections = $(".section");
console.log(sections);
var i = 0;
var scrolto = 0;

function next() {
  if (i == 0) {
    $(".prev").show();
  }
  if (i < sections.length - 1) {
    i++;
    if (i == sections.length - 1) {
      $(".next").hide();
    }
    $("html, body").animate(
      {
        scrollTop: sections[i].offsetTop,
      },
      1000
    );
  } else {
    alert("end reached");
  }
}
function prev() {
  if (i == sections.length - 1) {
    $(".next").show();
  }
  if (i > 0) {
    i--;
    if (i == 0) {
      $(".prev").show();
    }
    $("html, body").animate(
      {
        scrollTop: sections[i].offsetTop,
      },
      1000
    );
  }
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

// jQuery.fn.extend({
//   scrollTo: function (speed, easing) {
//     return this.each(function () {
//       var targetOffset = $(this).offset().top;
//       $("html,body").animate({ scrollTop: targetOffset }, speed, easing);
//     });
//   },
// });

// $(".next").click(function (e) {
//   e.preventDefault();
//   var $this = $(this),
//     $next = $this.parent().next();

//   $next.scrollTo(900, "linear");
//   console.log("next");
// });

// $(".previous").click(function (e) {
//   e.preventDefault();
//   var $this = $(this),
//     $prev = $this.parent().prev();

//   $prev.scrollTo(-900, "linear");
//   console.log("prev");
// });

// var tag = document.createElement("script");
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName("script")[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     videoId: "JEOL6r8DCVk",
//     playerVars: {
//       autoplay: 1,
//       controls: 0,
//       modestbranding: 1,
//       loop: 1,
//       playlist: "JEOL6r8DCVk",
//     },
//   });
// }
