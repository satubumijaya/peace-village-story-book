$(window).on('load', function () {
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {},
    });

    $('.section').each(function (index, element) {
        var sectionBg = $(this).find('.section-bg.fixed');
        var sectionOverlay = $(this).find('.bg-overlay.fixed');

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
            );

        new ScrollMagic.Scene({
            triggerElement: this,
            offset: -1,
        })
            .setTween(tl)
            .addTo(ctrl);

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: '200%',
        })
            .on('enter', function () {
                $(element).addClass('active');
            })
            .on('leave', function () {
                $(element).removeClass('active');
            })
            .addTo(ctrl);

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: '100%',
            offset: 20
        })
            .addIndicators({
                name: 'Timeline',
                colorTrigger: 'gray',
                colorStart: 'gray',
                colorEnd: 'gray',
            })
            .on('enter', function () {
                video = $(element).find('video').get(0);
                if (video) {
                    video.play();
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
