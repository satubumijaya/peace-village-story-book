$(window).on('load', function () {
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {},
    });
    var fadein_tween = TweenMax.fromTo('.section-bg', 1,
        { 
            yPercent: 100, opacity: 0.2 
        }, 
        { 
            yPercent: 0, opacity: 1, ease: Power1.easeInOut 
        }
    );

    // $('.section').each(function (index, element) {
    //     // set pin
    //     new ScrollMagic.Scene({
    //         triggerHook: 'onLeave',
    //         triggerElement: this,
    //     })
    //         .setPin(this)
    //         .addTo(ctrl);
    // }); //hero-story each

    $('.section').each(function (index, element) {
        new ScrollMagic.Scene({
            triggerHook: 'onLeave',
            triggerElement: this,
            offset: -1,
        })
            // .setTween(fadein_tween)
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
            })
            .addTo(ctrl); // scene end

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 'onEnter',
            offset: 1,
        })
            .setTween(fadein_tween)
            .addTo(ctrl)
            .on('enter', function (event) {
                console.log('triggered');
                if (event.scrollDirection === 'FORWARD') {
                    console.log(event.scrollDirection);
                    // console.log(element);
                    TweenLite.to(window, 1, {
                        scrollTo: {
                            // y: '.section' + (index + 1),
                            y: $(element).offset().top,
                            // y: $(window).height() + (index + 1),
                            autoKill: false,
                        },
                        ease: Power4.easeOut,
                    });

                    // console.log(event.scrollDirection);
                    // TweenLite.to(window, 1, {scrollTo:{y:".hero" + (index+1),
                    //     autoKill:false},ease: Power4.easeOut});
                } // scene end
            });
    }); //hero each
}); //window onload
