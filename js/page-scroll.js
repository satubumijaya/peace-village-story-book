$(window).on('load', function () {
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {},
    });

    /* intro gate scene */
    new ScrollMagic.Scene({
        triggerElement: '#intr-1',
        // offset: 1,
        duration: '10%',
        triggerHook: 'onLeave',
    })
        .on('leave', function () {
            console.log('leeeeaving');
            TweenLite.to('#intr-1 .intro-gate-left', 0.5, {
                xPercent: -100,
            });
            TweenLite.to('#intr-1 .intro-gate-right', 0.5, {
                xPercent: 100,
            });
        })
        .on('enter', function () {
            console.log('entering');
            TweenLite.to('#intr-1 .intro-gate-left', 0.5, {
                xPercent: 0,
            });
            TweenLite.to('#intr-1 .intro-gate-right', 0.5, {
                xPercent: 0,
            });
        })
        
        .addTo(ctrl);

    $('.section').each(function (index, element) {
        $(this).append(`<div class="debug-id">${$(this).attr('id')}</div>`);
        var sectionBg = $(this).find('.section-bg.fixed');
        var sectionOverlay = $(this).find('.bg-overlay.fixed');
        var logoLeft = $(this).find('.intro-logo-bottom-left');
        var logoRight = $(this).find('.intro-logo-bottom-right');

        var tl = new TimelineMax()
            .add(
                TweenMax.from(sectionBg, 0.5, {
                    opacity: 0,
                    // visibility: 'hidden',
                })
            )
            .add(
                TweenMax.from(sectionOverlay, 0.5, {
                    opacity: 0,
                    // visibility: 'hidden',
                }),
                0
            )
            .add(
                TweenMax.from(logoLeft, 0.5, {
                    opacity: 0,
                    // visibility: 'hidden',
                }),
                0
            )
            .add(
                TweenMax.to(logoRight, 0.5, {
                    opacity: 1,
                    // visibility: 'hidden',
                }),
                0
            );
        if ($(this).hasClass('book-layout')) {
            var bookImage = $(this).find('.image-container .image');
            tl.add(
                TweenMax.from(bookImage, 0.5, {
                    opacity: 0,
                }),
                0
            );
        }
        if ($(this).attr('id') === 'close-1') {
            var blueOverlay = $(this).find('.blue-overlay');
            tl.add(
                TweenMax.fromTo(
                    blueOverlay,
                    1,
                    {
                        opacity: 1,
                    },
                    {
                        opacity: 0.6,
                        delay: 1,
                    }
                ),
                0
            );
        }

        /* section scrolling scene */
        new ScrollMagic.Scene({
            triggerElement: this,
            offset: -1,
        })
            .setTween(tl)
            .addTo(ctrl);

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: $(this).attr('id') === 'close-2' ? '200%' : '300%',
            offset: window.innerHeight*-1,
            triggerHook: 0.95
        })
            .addIndicators({
                name: `Timeline ${$(this).attr('id')}`,
                colorTrigger: 'gray',
                colorStart: 'gray',
                colorEnd: 'gray',
            })
            .on('enter', function () {
                $(element).addClass('active');
            })
            .on('leave', function () {
                $(element).removeClass('active');
            })
            .addTo(ctrl);

        /* play and pause video scene */
        new ScrollMagic.Scene({
            triggerElement: this,
            duration: '100%',
            offset: 10,
        })
            .on('enter', function () {
                video = $(element).find('video').get(0);
                if (video) {
                    video.play();
                }
                const id = $(element).attr('id');
                window.location.hash = id;
                const idArr = id.split('-');
                $('#chapter .submenu a').removeClass('active');
                if (idArr[0] === 'st') {
                    $(`#nav-st-${idArr[1]}`).addClass('active');
                }
            })
            .on('leave', function () {
                video = $(element).find('video').get(0);
                if (video) {
                    console.log('pausing video');
                    video.pause();
                    video.currentTime = 0;
                }
            })
            // .setTween(tl)
            .addTo(ctrl);

        /* fullpage scrolling scene */
        new ScrollMagic.Scene({
            triggerHook: 'onLeave',
            triggerElement: this,
            offset: -1,
        })
            .addTo(ctrl) // scene end
            .on('leave', function (event) {
                if (event.scrollDirection === 'REVERSE') {
                    TweenLite.to(window, 1, {
                        scrollTo: {
                            y: $(window).height() * (index - 1),
                            autoKill: false,
                        },
                        ease: Power4.easeOut,
                    });
                }
            });

        /* fullpage scrolling scene */
        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 'onEnter',
            offset: 1,
        })
            // .setTween(tl)
            .addTo(ctrl)
            .on('enter', function (event) {
                if (event.scrollDirection === 'FORWARD') {
                    // $(element).addClass('active');
                    TweenLite.to(window, 1, {
                        scrollTo: {
                            y: $(element).offset().top,
                            autoKill: false,
                        },
                        ease: Power4.easeOut,
                    });
                } // scene end
            });
    }); //hero each
}); //window onload
