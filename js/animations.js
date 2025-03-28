var pageLoad = new TimelineMax();

function patchFinishedLoading(patch) {
  pageLoad.fromTo(
    "body",
    { opacity: 0 },
    { opacity: 1, duration: 0.5, delay: 0.05 },
    "<"
  );

  if (pageContext == "index") {
    
    const paragraphs = document.querySelectorAll('#text1 p');
    pageLoad
    .from("#text1 p", 1, { opacity:0, x: -25, stagger: 0.5 })
    .from("#canvasMask3", { x: -25, delay: 0.2 });

    ScrollTrigger.create({
      start: "top 50%",
      endTrigger: "#workList",
      end: "top 50%",
      onUpdate: (self) => handleScrollProgress(self.progress, "workScroll"),
    });

    ScrollTrigger.create({
      trigger: "#about",
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
        trigger: "#about",
        start: "top bottom",
        end: "top 30%",
      },
    });

    const tl3 = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: "#linksWrapper",
        start: "top bottom",
        end: "bottom 90%",
      },
    });

    const tl4 = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: "#workList",
        start: "top bottom", // Starts when top of workList hits bottom of viewport
        end: "top 60px", // Ends when top of workList hits top of viewport
      },
    });

    const tl5 = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: "#about",
        start: "top bottom",
        end: "top top",
      },
    });
    const tl6 = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: "#about",
        start: "top 80%",
        end: "top top",
      },
    });

    //// mq3

    if (mq3.matches) {
      const navHeight = navBar.offsetHeight;
      tl1.to("#logo", { translateY: "-50vh" }),
        tl1.to("#text1", { translateY: "-70vh", opacity: 0 }, "<"),
        tl1.to("#canvasMask4", { translateY: "-70vh" }, "<"),
        tl1.to("#canvasMask3", { height: navHeight, left: 0 }, "<"),
        tl1.to("#deco1", { opacity: 0 }, "<"),
        tl1.to("#deco2", { opacity: 0 }, "<"),
        tl1.to("#deco3", { opacity: 0 }, "<"),
        tl1.to("#backgroundMask2", { translateY: "-100vh" }, "<"),
        tl1.to("#decoText1", { translateY: "-50vh" }, "<");

      tl2.to("#about", { opacity: 1 }),
        tl2.to("#backgroundMask1", { height: "50vh" }, "<"),
        tl2.to("#backgroundMask3", { height: "100vh" }, "<30%");

      tl3.fromTo(
        "#curriculum",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<50%"
      ),
        tl3.to(".videojs-about", {
          keyframes: {
            opacity: [0, 1, 0, 1, 0, 0, 1, 0, 1],
            ease: "none", // ease the entire keyframe block
          },
          duration: 0.5,
        });

      tl3.fromTo(
        "#textContact",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<"
      ),
        tl3.fromTo(
          "#deco4",
          { opacity: 0, translateX: "-20px" },
          { opacity: 1, translateX: "0px" },
          "<50%"
        ),
        tl3.fromTo(
          "#deco5",
          { opacity: 0, translateX: "-20px" },
          { opacity: 1, translateX: "0px" },
          "<80%"
        );
    }

    if (mq2.matches) {
      tl4.to("#logo", { translateY: "-50vh" }),
        tl4.to("#decoText1", { opacity: 0 }, "<"),
        tl4.to("#text1", { opacity: 0, translateY: "-50vh" }, "<"),
        tl4.to("#canvasMask4", { translateY: "-70vh" }, "<"),
        tl4.to("#canvasMask3", { height: "65px" }, "<"),
        tl4.to("#logoPlayer", { scale: "1" }, "<"),
        tl4.to("#backgroundMask1", { height: 0 }, "<");

      tl6.fromTo(
        "#curriculum",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<"
      ),
        tl6.to(".videojs-about", {
          keyframes: {
            opacity: [0, 1, 0, 1, 0, 0, 1, 0, 1],
            ease: "none", // ease the entire keyframe block
          },
          duration: 0.5,
        });

      imageElement = document.querySelector(".videojs-about");
      imageHeight = imageElement.offsetHeight;

      tl6.to("#canvasMask3", { height: `400px` }, "<");

      tl3.fromTo(
        "#textContact",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<"
      ),
        tl3.fromTo(
          "#deco4",
          { opacity: 0, translateX: "-20px" },
          { opacity: 1, translateX: "0px" },
          "<50%"
        ),
        tl3.fromTo(
          "#deco5",
          { opacity: 0, translateX: "-20px" },
          { opacity: 1, translateX: "0px" },
          "<80%"
        );
      // tl3.to("#text1", { opacity: 0 }, "<80%");

      tl2.fromTo("#backgroundMask2", { top: "100vh" }, { top: "0vh" }, "<");
    }

    if (mq1.matches) {
      tl4.to("#logo", { translateY: "-48vh" }),
        tl4.to("#text1", { opacity: 0 }, "-=1"),
        tl4.to("#decoText1", { opacity: 0 }, "<"),
        tl4.to("#deco1", { opacity: 0 }, "<"),
        tl4.to("#deco2", { opacity: 0 }, "<"),
        tl4.to("#deco3", { opacity: 0 }, "<"),
        tl4.to("#logoPlayer", { scale: "1" }, "<"),
        tl4.to("#backgroundMask1", { translateX: "-100vw" }, "<"),
        tl4.to("#canvasMask4", { height: "100vh" }, "<");

      tl5.fromTo(
        "#curriculum",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<"
      ),
        tl5.to(".videojs-about", {
          keyframes: {
            opacity: [0, 1, 0, 1, 0, 0, 1, 0, 1],
            ease: "none", // ease the entire keyframe block
          },
          duration: 0.5,
        });

      tl3.fromTo(
        "#textContact",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<"
      ),
        tl3.fromTo(
          "#deco4",
          { opacity: 0, translateX: "-20px" },
          { opacity: 1, translateX: "0px" },
          "<50%"
        ),
        tl3.fromTo(
          "#deco5",
          { opacity: 0, translateX: "-20px" },
          { opacity: 1, translateX: "0px" },
          "<80%"
        );

      // tl5.fromTo("#backgroundMask2", { right: "100vw" }, { right: "0" }, "<");
    }

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

    let currentIndex = 1;
    const workFields = Array.from(
      document.getElementById("workFields").getElementsByTagName("li")
    ).map((li) => li.textContent);
    const decoText = document.getElementById("decoText1");
    decoText.textContent = workFields[0];

    setInterval(() => {
      if (isElementVisible("#header") == true) {
        decoText.textContent = workFields[currentIndex];
        CABLES.patch.setVariable("stringTexture", workFields[currentIndex]);
      }

      currentIndex = (currentIndex + 1) % workFields.length;
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  if (pageContext == "works") {
    pageLoad
      .from("#logo", 1, { autoAlpha: 0 }, 0.5)
      .from("#title", 1, { x: -25, autoAlpha: 0 }, 0.8)
      .from("#infoList", 1, { x: -25, autoAlpha: 0 }, 1)
      .from("#deco2", 1, { x: -25, autoAlpha: 0 }, 1.1)
      .from("#description", 1, { x: -25, autoAlpha: 0 }, 1.2);

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
}

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    pageLoad.seek(0).play();
  }
});
