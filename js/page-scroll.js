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

    // $('.section').each(function (index, element) {
        // $(this).append(`<div class="debug-id">${$(this).attr('id')}</div>`);
    // });

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

    if (window.innerWidth < 768) {
        $('.story-opening .section-bg').addClass('fixed');
        $('#intr-3 .section-bg').addClass('fixed');
        $('#close-1 .section-bg').addClass('fixed');

    }

    $('.video-scroll').each(function(){
        const $cell = $(this).find('.fp-tableCell');
        var timer;
        $cell.on('scroll', function () {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function(){
                if ($cell.scrollTop() + $cell.innerHeight() >= $cell[0].scrollHeight - 1) {
                    fullpage_api.setAutoScrolling(true);
                    fullpage_api.moveSectionDown();
                }
                if ($cell.scrollTop() === 0) {
                    fullpage_api.setAutoScrolling(true);
                    fullpage_api.moveSectionUp();
                }
            }, 500)
        });
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
    // bigSectionsDestination: 'top',
    css3: true,
    easingcss3: 'ease-in-out',
    scrollingSpeed: 700,
    // fitToSection: true,
    // fitToSectionDelay: 1,
    lazyLoading: true,
    // normalScrollElements: '.video-scroll .content-section',
    onLeave: function (origin, destination, direction) {
        const id = destination.item.id;
        if (!$(`#${id}`).hasClass('video-scroll')) {
            fullpage_api.setAutoScrolling(true);
        }
        // const top = $(`#${id}`).position().top;
        
        // $(`#${id}`).find('.fixed').css('transform', `translateY(${top}px)`);
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

        let $videoContainer = $(`#${id}`).find('video').closest('div');
        let video = $(`#${id}`).find('video').get(0);
        if (video) {
            video.play();
            video.onwaiting = function () {
                $videoContainer.addClass('waiting');
            };
            video.onplaying = function () {
                $videoContainer.removeClass('waiting');
                // hidePlaceholder(placeholder_2, this);
            };
        }
        
        if(destination.item.id === 'closing-video') {

        }
        
        if (origin.item.id === 'closing-video') {
            var src = $(`#${origin.item.id}`).find('iframe').attr('src');
            $(`#${origin.item.id}`).find('iframe').attr('src', '');
            $(`#${origin.item.id}`).find('iframe').attr('data-src', src);
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
        console.log('after load ', id);
        if ($(`#${id}`).hasClass('video-scroll')) {
            console.log('set false');
            fullpage_api.setAutoScrolling(false);
        }

        $(`#${id}`)
            .find('div[data-background-image]')
            .each(function (i, el) {
                // console.log(el);
                $(el).css('background-image', `url(${$(el).attr('data-background-image')})`);
            });
        
        setTimeout(() => {
            let $videoContainer = $(`#${id}`).find('video').closest('div');
            let video = $(`#${id}`).find('video').get(0);
            if (video) {
                video.play();
                video.onwaiting = function () {
                    $videoContainer.addClass('waiting');
                };
                video.onplaying = function () {
                    $videoContainer.removeClass('waiting');
                    // hidePlaceholder(placeholder_2, this);
                };
            }
        }, 500);
            
        /* add active class to nav */
        const idArr = id.split('-');
        $('#chapter .submenu a').removeClass('active');
        if (idArr[0] === 'st') {
            $(`#nav-st-${idArr[1]}`).addClass('active');
        }
        if (idArr[0] !== 'intr') {
            toggleAudio('pause');
            $('#play-backsound').addClass('hide');
        } else {
            $('#play-backsound').removeClass('hide');
        }


        $('.section').removeClass('fp-completely');
        $(`#${id}`).addClass('fp-completely');
    },
});
fullpage_api.setAutoScrolling(true);