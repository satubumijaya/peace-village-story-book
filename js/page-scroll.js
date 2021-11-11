$(window).on('load', function () {
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {},
    });

    $('.section').each(function (index, element) {
        // set pin
        new ScrollMagic.Scene({
            triggerHook: 'onLeave',
            triggerElement: this,
        })
            .setPin(this)
            .addTo(ctrl);
    }); //hero-story each

    $('.section').each(function (index, element) {
        new ScrollMagic.Scene({
            triggerHook: 'onLeave',
            triggerElement: this,
            offset: -1,
        })
            .on('leave', function (event) {
                if (event.scrollDirection === 'REVERSE') {
                    // TweenLite.to(window, 1, {
                    //     scrollTo: {
                    //         y: $(window).height() * (index - 1),
                    //         autoKill: false,
                    //     },
                    //     ease: Power4.easeOut,
                    // });
                }
            })
            .addTo(ctrl); // scene end

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 'onEnter',
            offset: 1,
        })
            .addTo(ctrl)
            .on('enter', function (event) {
                console.log('triggered');
                if (event.scrollDirection === 'FORWARD') {
                    console.log(event.scrollDirection);
                    // TweenLite.to(window, 1, {
                    //     scrollTo: {
                    //         // y: '.section' + (index + 1),
                    //         y: $(window).height() * (index + 1),
                    //         autoKill: false,
                    //     },
                    //     ease: Power4.easeOut,
                    // });
                }
            }); // scene end
    }); //hero each
}); //window onload
