// General Animations

$("a.tint").on("click", function (e) {
  e.preventDefault();
  var destination = $(this).attr("href");

  let tl = new TimelineMax({
    onComplete: function () {
      window.location = destination;
    },
  });

  tl.to("body", { opacity: 0 });
});
var timeline = new TimelineMax();

function patchFinishedLoading(patch) {
  if (pageContext == "index") {
    // ScrollforCables
    timeline
      .from("body", 1, { opacity: 0 }, 0.5)
      .from("#text1", 1, { x: -25, autoAlpha: 0 }, 0.8)
      .from("#canvasMask3", 1, { x: -25 }, 1);

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

    //// mq3

    if (mq3.matches) {
      tl1.to("#logo", { translateY: "-50vh" }),
        tl1.to("#text1", { translateY: "-70vh", opacity: 0 }, "<"),
        tl1.to("#canvasMask4", { translateY: "-70vh" }, "<"),
        tl1.to("#deco1", { opacity: 0 }, "<"),
        tl1.to("#deco2", { opacity: 0 }, "<"),
        tl1.to("#deco3", { opacity: 0 }, "<"),
        tl1.to("#canvasMask3", { height: "65px", left: 0 }, "<"),
        tl1.to("#backgroundMask2", { translateY: "-100vh" }, "<"),
        tl1.to("#decoText1", { translateY: "-50vh" }, "<");

      tl2.to("#about", { opacity: 1 }),
        tl2.to("#backgroundMask1", { height: "50vh" }, "<"),
        tl2.to("#backgroundMask3", { height: "100vh" }, "<30%");

      tl3.fromTo(
        "#curriculum",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<"
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

    //// mq2

    if (mq2.matches || mq1.matches) {
      tl4.to("#logo", { translateY: "-50vh" }),
        tl4.to("#decoText1", { opacity: 0 }, "<"),
        tl4.to("#text1", { opacity: 0, translateY: "-50vh" }, "<"),
        tl4.to("#logoPlayer", { scale: "0.75" }, "<"),
        tl4.to("#backgroundMask1", { height: 0 }, "<");

      tl3.fromTo(
        "#curriculum",
        { opacity: 0, translateX: "-20px" },
        { opacity: 1, translateX: "0px" },
        "<"
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

      tl2.fromTo("#backgroundMask2", { top: "100vh" }, { top: "0vh" }, "<");
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
}
if (pageContext == "works") {
  timeline
    .from("body", 1, { opacity: 0 }, 1)
    .from("#logo", 1, { autoAlpha: 0 }, 1.2)
    .from("#infoList", 1, { x: -25, autoAlpha: 0 }, 1)
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
if (pageContext == "index") {
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

    // Move to next index, loop back to 0 when reaching the end
    currentIndex = (currentIndex + 1) % workFields.length;
  }, 5000); // 5000 milliseconds = 5 seconds
}
