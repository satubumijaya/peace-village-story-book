$(window).on('load', function () {
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

    $('.section').each(function (index, element) {
        $(this).append(`<div class="debug-id">${$(this).attr('id')}</div>`);
    })

    // var height = window.innerHeight;
    // var a = setInterval(function () {
    //     // $(window).scrollTop(-1);
    //     resize();
    // }, 500); // Don't lower more than 500ms, otherwise there will be animation-problems with the  Safari toolbar

    // $(window).on('resize', function () {
    //     resize();
    // });

    // var resize = function () {
    //     if (window.innerHeight != height) {
    //         console.log('resized')
    //         height = window.innerHeight;
    //         $('.fp-tableCell').css('height', height + 'px');
    //     }
    // };

    if(window.innerWidth < 768){
        $('.story-opening .section-bg').addClass('fixed');
        $('#intr-3 .section-bg').addClass('fixed');
    }
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