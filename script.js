function show() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
show();


document.querySelector("#menu").addEventListener("click", function () {
    document.querySelector("#fullScreenNav").style.left = 0;
})
document.querySelector("#back").addEventListener("click", function () {
    document.querySelector("#fullScreenNav").style.left = "-100vw";
})

gsap.from("#left>h1",{
    opacity:0,
    duration:1,
    delay:4,
    onStart:function(){
        $('#left>h1').textillate({ in: { effect: 'fadeInUp' } });
    }
})
gsap.from("#page2Img1",{
    scrollTrigger:{
        trigger:"#page2Img1",
        scroller:"#main",
        // markers:true,
        scrub:true,
        start:"top 90%",
        end: "top 10%",

    },
    opacity:0,
    rotateX:90,
    duration:1
})

gsap.from("#page2Img2",{
    scrollTrigger:{
        trigger:"#page2Img2",
        scroller:"#main",
        // markers:true,
        scrub:true,
        start:"top 50%",
        end: "top 10%",

    },
    opacity:0,
    rotateY:-90,
    duration:1
})


gsap.from("#page2Img3",{
    scrollTrigger:{
        trigger:"#page2Img3",
        scroller:"#main",
        // markers:true,
        scrub:true,
        start:"top 90%",
        end: "top 50%",

    },
    opacity:0,
    rotateX:90,
    duration:1
})

gsap.to("#right img",{
    y:"-100vh",
    duration:3,
    repeat:-1,
    ease: Power0.easeNone
})


// cursor

gsap.to("#cur", {
    repeat: -1,
    duration: 8,
    rotate: 360,
});
gsap.to("#overlay img", {
    repeat: -1,
    duration: 7,
    rotate: 360,
});

gsap.to("#overlay", {
    duration:2,
    
    delay: 3,
    y:"-100%"
});

document.querySelector("#main").addEventListener("mousemove", function (dets) {
    document.querySelector("#cur").style.left = `${dets.x}px`;
    document.querySelector("#cur").style.top = `${dets.y}px`;

    //   console.log(dets.target.x);
});
