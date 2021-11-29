// observer.observe();
// const observer = lozad('.lozad', {
//     loaded: function (el) {
//         el.classList.add('loaded');
//     },
// });
$(window).on('load', function () {
    // const observer = lozad('.lozad', {
    //     loaded: function (el) {
    //         el.classList.add('loaded');
    //     },
    // });

    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {},
    });

    // /* intro gate scene */
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

    // $('.image-scroll-group').each(function (index, element) {
    //     sectionCount = $(this).find('.section').length;
    //     new ScrollMagic.Scene({
    //         triggerElement: this,
    //         duration: sectionCount * $(window).height(),
    //         // offset: window.innerHeight * -1,
    //         triggerHook: 0.5,
    //     })
    //         .on('enter', function () {
    //             $(element).addClass('active');
    //         })
    //         .on('leave', function () {
    //             $(element).removeClass('active');
    //         })
    //         .addTo(ctrl);
    // });
    $('.section').each(function (index, element) {
        $(this).append(`<div class="debug-id">${$(this).attr('id')}</div>`);
    })
    $('.section').each(function (index, element) {
        // $(this).append(`<div class="debug-id">${$(this).attr('id')}</div>`);
        return false;
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

        /* active inactive section */
        let activeDuration = '200%';
        if ($(this).attr('id') === 'close-2') {
            activeDuration = '100%';
        }
        if ($(this).hasClass('image-scroll-layout')) {
            const imageCount = $(this).find('.image-scroll div').length;
            activeDuration = `${imageCount + 3}00%`;
        }

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: activeDuration,
            triggerHook: 0.95,
        })
            // .addIndicators({
            //     name: `Timeline ${$(this).attr('id')}`,
            //     colorTrigger: 'gray',
            //     colorStart: 'gray',
            //     colorEnd: 'gray',
            // })
            .on('enter', function () {
                $(element).addClass('active');
                $(element)
                    .find('.lozad')
                    .each(function (el, i) {
                        observer.triggerLoad($(this).get(0));
                    });
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
                // window.location.hash = id;
                history.replaceState(null, null, `#${id}`);

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

    })
}); //window onload

new fullpage('#fullpage', {
    //options here
    autoScrolling: true,
    // scrollHorizontally: true
    scrollBar: true,
    // autoScrolling:false,
    // fadingEffect: 'sections',
    // fadingEffect: true,
    // scrollOverflow: true,
    bigSectionsDestination: 'top',
    css3: true,
    easingcss3: 'ease-in-out',
    scrollingSpeed: 700,
    fitToSection: true,
    fitToSectionDelay: 10,
    lazyLoading: true,
    normalScrollElements: '.video-scroll .content-section',
    onLeave: function (origin, destination, direction) {
        // origin related
        const originId = origin.item.id;
        let originVideo = $(`#${originId}`).find('video').get(0);
        if (originVideo) {
            // console.log('pausing video');
            originVideo.pause();
            originVideo.currentTime = 0;
        }
        if (direction === 'down') {
            // $('.section').removeClass('origin');
            // $(`#${originId}`).addClass('origin');
        }

        console.log(destination.item.id);
        const id = destination.item.id;
        // $('')
        // $(`#${id}`).prev('.section').addClass('origin');

        // $(id).addClass('active');
        // $(id)
        //     .find('.lozad')
        //     .each(function (el, i) {
        //         console.log(el);
        //         observer.triggerLoad($(this).get(0));
        //     });
        // const id = $(id).attr('id');
        // window.location.hash = id;
        let video = $(`#${id}`).find('video').get(0);
        if (video) {
            // console.log('video play');
            video.play();
        }

        $(`#${id}`)
            .find('div[data-background-image]')
            .each(function (i, el) {
                // console.log(el);
                $(el).css('background-image', `url(${$(el).attr('data-background-image')})`);
            });
        $(`#${id}`)
            .next('.section')
            .find('div[data-background-image]')
            .each(function (i, el) {
                // console.log(el);
                $(el).css('background-image', `url(${$(el).attr('data-background-image')})`);
            });

        history.replaceState(null, null, `#${id}`);
    },
    afterLoad: function (origin, destination, direction) {
        const id = destination.item.id;
        $(`#${id}`)
            .find('div[data-background-image]')
            .each(function (i, el) {
                // console.log(el);
                $(el).css('background-image', `url(${$(el).attr('data-background-image')})`);
            });
    },
});