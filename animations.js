window.addEventListener("load", function () {
  if (pageContext == "index") {
    // ScrollforCables

    ScrollTrigger.create({
      start: "top 50%",
      endTrigger: "#workList",
      end: "top 50%",
      onUpdate: (self) => handleScrollProgress(self.progress, "workScroll"),
    });

    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 50%",
      end: "bottom 100%",
      onUpdate: (self) => handleScrollProgress(self.progress, "aboutScroll"),
    });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: "#void",
        start: "top 0%",
        endTrigger: "#workList",
        end: "top 0%",
      },
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: "#workList",
        start: "bottom 0%",
        endTrigger: "#contact",
        end: "bottom bottom",
      },
    });

    //// mq3

    if (mq3.matches) {
      tl1.to("#logo", { translateY: "-50vh" }),
        tl1.to("#text1", { translateY: "-70vh", opacity: 0 }, "<"),
        tl1.to("#deco1", { opacity: 0 }, "<"),
        tl1.to("#deco2", { opacity: 0 }, "<"),
        tl1.to("#deco3", { opacity: 0 }, "<");

      tl2.to("#textContact", { opacity: 1 }, "<"),
        tl2.to("#image img", { opacity: 1, left: "-30px" }, "<"),
        tl2.to("#linksContact a", { opacity: 1, stagger: 0.2 }, "<50%"),
        //    Snapping

        ScrollTrigger.create({
          onEnter: () => {
            //   console.log("onEnter");
            CABLES.patch.setVariable("stringTexture", "works");
          },
          onLeave: () => {
            //   console.log("onLeave");
            gsap.to(window, { scrollTo: "#contact", duration: 2 });
            // CABLES.patch.setVariable("stringTexture", "let's work together");
          },
          onEnterBack: () => {
            //   console.log("onenterBack");
          },
          onLeaveBack: () => {
            //   console.log("onLeaveBack");
            gsap.to(window, { scrollTo: "#void", duration: 2 });
            // CABLES.patch.setVariable("stringTexture", "media design");
          },
          start: "top 90%",
          end: "bottom bottom",
          trigger: "#workList",
        });

      ScrollTrigger.create({
        onLeave: () => {
          gsap.to(window, { scrollTo: "#workList", duration: 2 });
        },
        // markers: true,
        start: "top top",
        end: "bottom 70%",
        trigger: "#void",
      });

      // ScrollTrigger.create({
      //     trigger: "#contact",
      //     onLeave: () => {
      //         gsap.to(window, {
      //             scrollTo: {
      //                 y: "#workList", // Scroll to this element
      //                 offsetY: 70, // Optional: Offset for precise positioning
      //             },
      //             duration: 2, // Duration of the scroll animation
      //         });
      //         CABLES.patch.setVariable("stringTexture", "work");
      //     },
      // });
    }

    //// mq2

    if (mq2.matches) {
      tl1.to("#logo", { translateY: "-50vh" }),
        tl1.to("#text1", { translateY: "-70vh", opacity: 0 }, "<"),
        tl1.to("#deco1", { opacity: 0 }, "<"),
        tl1.to("#deco2", { opacity: 0 }, "<"),
        tl1.to("#deco3", { opacity: 0 }, "<");

      tl2.to("#textContact", { opacity: 1 }, "<"),
        tl2.to("#image img", { opacity: 1, left: "-30px" }, "<"),
        tl2.to("#linksContact a", { opacity: 1, stagger: 0.2 }, "<50%");
    }

    // FadeIn work Elements

    const fadeInAnimation = gsap.timeline({
      paused: true,
      defaults: { opacity: 0, top: "100px" },
    });

    fadeInAnimation.to(".work", {
      opacity: 1,
      duration: 1,
      top: "0px",
      stagger: 0.1,
    });

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start the GSAP animation when the element is visible
          fadeInAnimation.play();
          observer.unobserve(entry.target); // Stop observing once animation starts
        }
      });
    }, options);

    // Start observing each grid item
    gridItems.forEach((item) => {
      observer.observe(item);
    });
  }
});

if (pageContext == "works") {
  if (mq3.matches) {
    // const galleryVoidElement = document.querySelector(".galleryVoid");
    // // Scroll to the position of the galleryVoidElement
    // gsap.to(window, {
    //   duration: 0.2,
    //   scrollTo: {
    //     y: galleryVoidElement,
    //     offsetY: 0, // Optionally adjust the offset if needed
    //   },
    // });
  }
}
