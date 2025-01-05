const logo = document.getElementById("logo");
const gridItems = document.querySelectorAll(".work");
const headerSection = document.querySelector("#header");
const workSection = document.querySelector("#workList");
const aboutSection = document.querySelector("#about");
var mainColor;

var workPSR_mq3 = [1, 0, 0, 10, 138, -28, 0];

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//Functions
function handleScrollProgress(progress, variableName) {
  CABLES.patch.setVariable(variableName, progress);
  // console.log(variableName + String(progress));
  // console.log(progress);
}

function setPSR(variable, values) {
  CABLES.patch.setVariable(variable, values);
  // console.log(values);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createOrderedRandomArray(size, minStep, maxStep) {
  const array = [];
  let currentValue = 0;

  for (let i = 0; i < size; i++) {
    currentValue +=
      Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
    array.push(currentValue);
  }

  return array;
}

function getElementPosition(elementId) {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error("Element not found!");
    return;
  }

  const rect = element.getBoundingClientRect();
  return { top: rect.top, bottom: rect.bottom };
}

function isElementVisible(elementSelector) {
  const element = document.querySelector(elementSelector);
  if (!element) return false;

  // Check if element exists in DOM
  if (!element.parentElement) return false;

  const style = window.getComputedStyle(element);

  // Check basic visibility properties
  if (style.display === "none") return false;
  if (style.visibility === "hidden") return false;
  if (style.opacity === "0") return false;

  // Check element dimensions and position
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return false;

  // Check if element is within viewport
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return !(
    rect.bottom < 0 ||
    rect.top > windowHeight ||
    rect.right < 0 ||
    rect.left > windowWidth
  );
}

function highlightMenuItem(index) {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("highlight");
  });

  // Add highlight class to selected link
  navLinks[index].classList.add("highlight");
}

document.addEventListener("CABLES.jsLoaded", function (event) {
  /// Scroll Function
  let isScrolling = false;
  const workElements = Array.from(document.querySelectorAll(".work"));

  function scrollToSection(sectionName, durationLenght) {
    const section = document.querySelector(`.${sectionName}`);
    CABLES.patch.setVariable("mainColorHex", "#121212");
    if (section) {
      isScrolling = true;
      gsap.to(window, {
        duration: durationLenght,
        scrollTo: section,
        ease: "power3.out",
        onComplete: () => {
          // Determine which work post to scroll to based on section
          if (sectionName === "header") {
            // When coming from header, scroll to first work post
            scrollToElement(workElements[0], 2);
          } else if (sectionName === "about") {
            // When coming from about, scroll to last work post
            scrollToElement(workElements[workElements.length + 1], 0.35);
          }
          isScrolling = false;
        },
      });
    }
  }

  function scrollToSectionDesktop(sectionName, durationLenght, offset = 0) {
    const section = document.querySelector(`.${sectionName}`);

    if (section) {
      isScrolling = true;
      gsap.to(window, {
        duration: durationLenght,
        scrollTo: {
          y: section,
          offsetY: offset, // Adjust this value as needed
          autoKill: false,
        },
        ease: "power3.out",
        onComplete: () => {
          isScrolling = false;
        },
      });
    }
  }

  function scrollToElement(element, durationLength = 1) {
    return new Promise((resolve) => {
      // If already scrolling, queue this scroll
      if (isScrolling) {
        setTimeout(() => scrollToElement(element, durationLength), 100);
        return;
      }

      isScrolling = true;

      // Helper function to cleanup previous elements
      const cleanupPreviousElements = () => {
        workElements.forEach((el) => {
          el.classList.remove("visibleImage", "active");

          const titleElement = el.querySelector(".title");
          titleElement?.classList.remove("visibleTitle");

          const descriptionElement = el.querySelector(".description");
          descriptionElement?.classList.remove("visibleDescription");

          const videoElement = el.querySelector(".videojs-work");
          if (videoElement) {
            const player = videojs(videoElement);
            player.muted(true);
            player.pause();
          }
        });
      };

      // Helper function to setup new element
      const setupNewElement = () => {
        element.classList.add("visibleImage", "active");

        const titleElement = element.querySelector(".title");
        titleElement?.classList.add("visibleTitle");

        const descriptionElement = element.querySelector(".description");
        descriptionElement?.classList.add("visibleDescription");

        // Update main color if available
        const mainColor = element.getAttribute("color");
        if (mainColor && CABLES?.patch) {
          CABLES.patch.setVariable("mainColorHex", mainColor);
        }

        // Handle video playback
        const videoElement = element.querySelector(".videojs-work");
        if (videoElement) {
          const player = videojs(videoElement);
          player.muted(true);
          player.play().catch(console.error);
        }
      };

      // Cleanup previous state
      cleanupPreviousElements();

      if (element) {
        // Calculate the exact scroll position
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 65;

        // Perform the scroll animation
        gsap.to(window, {
          duration: durationLength,
          scrollTo: {
            y: offsetPosition,
            autoKill: false,
          },
          ease: "power3.Out", // Smoother easing
          onStart: () => {
            // Add a class to prevent other scrolling during animation
            document.body.classList.add("is-scrolling");
          },
          onComplete: () => {
            setupNewElement();

            // Small delay to ensure everything is settled
            setTimeout(() => {
              isScrolling = false;
              document.body.classList.remove("is-scrolling");
              resolve();
            }, 50);
          },
        });
      }
    });
  }

  // Track position of the mask

  const workList = document.getElementById("workList");
  const mask1 = document.getElementById("canvasMask1");
  const mask5 = document.getElementById("canvasMask5");

  function updatePosition() {
    if (workList && mask1 && mask5) {
      const rect = workList.getBoundingClientRect();
      var WorkHeight = workList.offsetHeight;

      mask1.style.transform = `translateY(${rect.top + window.scrollY}px)`;
      mask1.style.height = `${WorkHeight}px`;
      mask5.style.transform = `translateY(${rect.bottom + window.scrollY}px)`;
    }
  }

  requestAnimationFrame(function animate() {
    updatePosition();
    requestAnimationFrame(animate);
  });

  /////////// Context Index ///////////

  if (pageContext == "index") {
    const usedPositions = new Set();
    const workContainers = document.querySelectorAll(".work");

    /// Setting players

    var playerWork = videojs(document.querySelector(".videojs-work"), {
      controls: false,
      autoplay: false,
      preload: "auto",
      muted: true,
    });

    var playerAbout = videojs(document.querySelector(".videojs-about"), {
      controls: false,
      autoplay: true,
      preload: "auto",
      muted: true,
      loop: true,
    });

    /// Random position on grid

    if (mq3.matches) {
      const numRows = 10;
      const numCols = 5;

      gridItems.forEach((item) => {
        let randomRow, randomCol;
        do {
          randomRow = Math.floor(Math.random() * numRows) + 1;
          randomCol = Math.floor(Math.random() * numCols) + 1;
        } while (usedPositions.has(`${randomRow}-${randomCol}`));

        usedPositions.add(`${randomRow}-${randomCol}`);

        item.style.gridRow = randomRow;
        item.style.gridColumn = randomCol + 1;
      });

      gridItems.forEach((item) => {
        const depth = getRandomInt(-50, 50);

        gsap.to(item, {
          yPercent: () => {
            return depth;
          },
          ease: "none",
          scrollTrigger: {
            trigger: "#workList",
            scrub: 1,
          },
        });
      });

      //

      workContainers.forEach((container) => {
        const videoElement = container.querySelector(".videojs-work");
        if (!videoElement) return; // Skip if no video found in this container

        const player = videojs(videoElement);

        container.addEventListener("mouseenter", function () {
          player.muted(true);
          player.play();
          // console.log("Mouseover:", container.getAttribute("Project"));
          mainColor = container.getAttribute("color");
          CABLES.patch.setVariable("mainColorHex", mainColor);
          // console.log(mainColor);
        });

        container.addEventListener("mouseleave", function () {
          player.muted(true);
          player.pause();
          // console.log("Mouseleave:", container.getAttribute("Project"));
          mainColor = "#0d0d0d";
          CABLES.patch.setVariable("mainColorHex", mainColor);
        });

        // Optionally, if you want autoplay:
        // player.ready(function () {
        //   player.play();
        // });
      });

      workContainers.forEach((container) => {
        const titleElement = container.querySelector(".title");
        container.addEventListener("mouseover", (event) => {
          container.classList.add("workIndex");
          titleElement.classList.add("textVisible");
        });

        container.addEventListener("mouseout", () => {
          container.classList.remove("workIndex");
          titleElement.classList.remove("textVisible");
        });
      });
    }

    //// mq2

    if (mq2.matches) {
      const numCols = 3;
      const indexRows = createOrderedRandomArray(gridItems.length, 1, 2);

      gridItems.forEach((item, index) => {
        // Sequential column assignment
        const column = (index % numCols) + 1;

        // Random vertical offset within maxOffset
        const verticalOffset = getRandomInt(-20, 200);

        // Apply positions and offset
        item.style.gridColumn = column;
        item.style.gridRow = indexRows[index];
        item.style.transform = `translateY(${verticalOffset}px)`;
      });
    }

    /// Scroll control

    if (mq3.matches) {
      const triggers = [
        {
          trigger: "#work",
          start: "top 30%",
          end: "bottom 80%",
          onEnter: () => {
            scrollToSectionDesktop("collection-list", 2, 65);
            highlightMenuItem(1);
          },
          onLeave: () => {
            scrollToSectionDesktop("about", 2, 0);
            highlightMenuItem(2);
          },
          onEnterBack: () => {
            scrollToSectionDesktop("collection-list", 2, 65);
            highlightMenuItem(1);
          },
          onLeaveBack: () => {
            scrollToSectionDesktop("header", 2, 0);
            highlightMenuItem(2);
          },
        },
        // {
        //   trigger: "#about",
        //   start: "top bottom",

        //   onEnter: () => {
        //     scrollToSectionDesktop("about", 2, 65);
        //     highlightMenuItem(2);
        //   },
        // },
        // {
        //   trigger: "#void",
        //   start: "top bottom",
        //   end: "bottom 10%",
        //   onEnterBack: () => {
        //     scrollToSectionDesktop("header", 3, 0);
        //     highlightMenuItem(0);
        //   },
        // },
        {
          trigger: "#workList",
          start: "top 90%",
          end: "bottom bottom",
          onEnter: () => {
            CABLES.patch.setVariable("stringTexture", "works");
          },
          onLeave: () => {
            CABLES.patch.setVariable("stringTexture", "about");
            CABLES.patch.setVariable("mainColorHex", "#0b00ff");
          },
          onEnterBack: () => {
            CABLES.patch.setVariable("stringTexture", "works");
          },
          onLeaveBack: () => {
            // CABLES.patch.setVariable("stringTexture", "mediaDesign");
            // CABLES.patch.setVariable("mainColor", "#121212");
          },
        },
        // Add more triggers here if needed
      ];

      // Loop through the triggers array to create ScrollTriggers
      triggers.forEach(
        ({
          trigger,
          start,
          end,
          onEnter,
          onLeave,
          onEnterBack,
          onLeaveBack,
        }) => {
          ScrollTrigger.create({
            trigger,
            start,
            end,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
          });
        }
      );
    }

    if (mq1.matches || mq2.matches) {
      const firstElement = document.getElementsByClassName("work")[0];

      firstElement.classList.add("visibleImage");

      // function handleScrollNavigation(delta, isTouch = false) {
      //   if (isScrolling) return;

      //   // Directly use the index of the currently visible work element
      //   const currentVisible = document.querySelector(".work.visibleImage");
      //   const currentIndex = workElements.indexOf(currentVisible);

      //   console.log("Current Work Index:", currentIndex);

      //   const scrollDown = isTouch ? delta < 0 : delta > 0;
      //   const scrollUp = isTouch ? delta > 0 : delta < 0;

      //   if (scrollDown && currentIndex < workElements.length) {
      //     scrollToElement(workElements[currentIndex + 1], 1);
      //   } else if (
      //     scrollUp &&
      //     currentIndex > 0 &&
      //     isElementVisible("#about") === false
      //   ) {
      //     scrollToElement(workElements[currentIndex - 1], 1);
      //   } else if (
      //     scrollDown &&
      //     currentIndex === workElements.length &&
      //     isElementVisible("#about") === false
      //   ) {
      //     scrollToSection("about", 2);
      //   } else if (scrollUp && currentIndex === 0) {
      //     // scrollToSection("header", 2);
      //   }
      // }
      // Declare currentIndex globally
      let currentIndex = 0; // Initialize with -1 to indicate no element is visible initially

      if (isScrolling) return;

      // const hammer = new Hammer(document.body);
      const hammer = new Hammer(document.getElementById("workList"));

      hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
      const workelementsLength = workElements.length - 1;

      hammer.on("swipeup", (ev) => {
        if (currentIndex < workelementsLength) {
          currentIndex += 1; // Increment index
          const nextElement = workElements[currentIndex];
          console.log(
            "Scrolling to previous element:",
            nextElement.getAttribute("project"),
            currentIndex
          );
          scrollToElement(nextElement, 1);
        } else {
          console.log("Already at last element");
          scrollToSection("about", 2);
        }
      });

      hammer.on("swipedown", (ev) => {
        if (currentIndex > 0) {
          currentIndex -= 1; // Decrement index
          const previousElement = workElements[currentIndex];
          console.log(
            "Scrolling to previous element:",
            previousElement.getAttribute("project"),
            currentIndex
          );
          scrollToElement(previousElement, 1);
        } else {
          currentIndex = 0;
          console.log("Already at first element", currentIndex);
          scrollToSection("header", 2);
        }
      });

      const triggers = [
        {
          trigger: "#work",
          start: "top 70%",
          end: "bottom 50%",
          onEnter: () => {
            const nextElement = workElements[0];
            scrollToElement(nextElement, 2);
            highlightMenuItem(1);
          },
          onLeave: () => {
            scrollToSectionDesktop("about", 2, 0);
            highlightMenuItem(2);
          },
          onEnterBack: () => {
            currentIndex = workelementsLength;
            const previousElement = workElements[currentIndex];

            console.log(
              "Scrolling to previous element:",
              previousElement.getAttribute("project"),
              currentIndex
            );

            scrollToElement(previousElement, 1);
            // console.log(nextElement);
            highlightMenuItem(1);
          },
          onLeaveBack: () => {
            // scrollToSection("header", 2, 0);
            highlightMenuItem(0);
          },
        },

        {
          trigger: "#workList",
          start: "bottom 10%",
          end: "bottom bottom",
          onEnter: () => {
            //   console.log("onEnter");
            CABLES.patch.setVariable("stringTexture", "works");
          },
          onLeave: () => {
            CABLES.patch.setVariable("stringTexture", "about");
            CABLES.patch.setVariable("mainColorHex", "#0b00ff");
          },
          onEnterBack: () => {
            CABLES.patch.setVariable("stringTexture", "works");
          },
          onLeaveBack: () => {
            // CABLES.patch.setVariable("stringTexture", "mediaDesign");
            // CABLES.patch.setVariable("mainColor", "#121212");
          },
        },
        // Add more triggers here if needed
      ];

      triggers.forEach(
        ({
          trigger,
          start,
          end,
          onEnter,
          onLeave,
          onEnterBack,
          onLeaveBack,
        }) => {
          ScrollTrigger.create({
            trigger,
            start,
            end,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
          });
        }
      );
    }

    // canvasMask position
    const canvasMask4 = document.getElementById("canvasMask4");
    canvasMask4.style.height =
      String(getElementPosition("#text1").bottom) + "px";
    if (mq2.matches) {
      const deco3 = document.getElementById("deco3");
      deco3.style.top = String(getElementPosition("#text1").bottom) + "px";
    }
    if (mq1.matches) {
      const deco3 = document.getElementById("deco3");
      deco3.style.top = String(getElementPosition("#text1").bottom) + "px";
    }
  }

  /////////// Context Works ///////////

  if (pageContext == "works") {
    var cmsVideos = document.querySelectorAll('[data-vid="works"]');
    var cmsImages = document.querySelectorAll('[data-img="works"]');
    var imageUrls = [];
    var imageAlt = [];

    // Adding video links to imageUrls array at the beginning
    cmsVideos.forEach(function (cmsVideo, index) {
      imageUrls.unshift(cmsVideo.href);
      imageAlt.unshift("video" + String(index));
    });

    // Adding image links to imageUrls array
    cmsImages.forEach(function (cmsImage, index) {
      imageUrls.push(cmsImage.src);
      imageAlt.push("image" + String(index));
    });

    CABLES.patch.setVariable("videoUrl", imageUrls[0]);
    console.log("videoUrl", imageUrls[0]);

    if (mq3.matches) {
      const imageListContainer = document.getElementById("imageList");

      let currentImageIndex = 0;

      function updateActiveItem(index) {
        const listItems = imageListContainer.querySelectorAll("li");
        listItems.forEach((item) => {
          item.classList.remove("active");
        });
        listItems[index].classList.add("active");
      }

      function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        updateActiveItem(currentImageIndex);
        // console.log(imageUrls[currentImageIndex]);
        CABLES.patch.setVariable("imageUrl", imageUrls[currentImageIndex]);
      }

      // Iterate through the arrays and create list items
      for (let i = 0; i < imageUrls.length; i++) {
        const listItem = document.createElement("li");

        const anchor = document.createElement("a");
        anchor.setAttribute("data-url", imageUrls[i]); // Store URL in a custom attribute
        // anchor.textContent = imageAlt[i];

        listItem.appendChild(anchor);
        imageListContainer.appendChild(listItem);

        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          const clickedImageUrl = event.target.getAttribute("data-url"); // Retrieve URL from custom attribute
          currentImageIndex = imageUrls.indexOf(clickedImageUrl);
          updateActiveItem(currentImageIndex);
          CABLES.patch.setVariable("imageUrl", clickedImageUrl);
        });
      }
      updateActiveItem(currentImageIndex);

      // Function to handle intersection observer callback
      function handleIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const url = entry.target.dataset.media;
            const index = imageUrls.indexOf(url);
            if (index !== -1) {
              currentImageIndex = index;
              updateActiveItem(currentImageIndex);
              // CABLES.patch.setVariable("imageUrl", imageUrls[currentImageIndex]);
            }
          }
        });
        console.log(imageUrls[currentImageIndex]);
      }

      // Use Intersection Observer to detect when an image enters the viewport
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });

      // Observe each image element
      imageUrls.forEach((url) => {
        const container = document.createElement("div");
        container.setAttribute("data-media", url); // Set a data attribute for each URL
        container.style.height = "100vh"; // Ensure divs are the full height of the viewport
        container.style.visibility = "hidden";
        container.classList.add("galleryVoid");
        document.body.appendChild(container);
        observer.observe(container);
      });

      const col1mask = document.getElementById("canvasMask3");
      const col2mask = document.getElementById("canvasMask4");

      col1mask.style.height = String(getElementPosition("#info").bottom) + "px";
      col2mask.style.height =
        String(getElementPosition("#description").bottom) + "px";
    }

    let sections = gsap.utils.toArray(".galleryelement");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#gallery",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector("#gallery").offsetWidth,
      },
    });

    // VideoControls

    if (mq3.matches) {
      const playerControls = document.getElementById("playerControls");
      let timeout;
      let isHovering = false;

      function showControls() {
        playerControls.style.opacity = "1";
        // Reset timer
        clearTimeout(timeout);
        // Only set hide timer if not hovering
        if (!isHovering) {
          timeout = setTimeout(hideControls, 2000);
        }
      }

      function hideControls() {
        if (!isHovering) {
          // Only hide if not hovering
          playerControls.style.opacity = "0";
        }
      }
      playerControls.style.transition = "opacity 0.3s ease";
      playerControls.style.opacity = "0";

      // Event listeners for mouse movement
      document.addEventListener("mousemove", showControls);

      // Mouse enter/leave for controls
      playerControls.addEventListener("mouseenter", () => {
        isHovering = true;
        showControls();
        clearTimeout(timeout); // Cancel any pending hide
      });

      playerControls.addEventListener("mouseleave", () => {
        isHovering = false;
        timeout = setTimeout(hideControls, 2000);
      });
    }

    const mainElement = document.querySelector("main");

    mainElement.addEventListener("scroll", () => {
      let verticalScrollValue = mainElement.scrollTop;
      console.log(verticalScrollValue);

      CABLES.patch.setVariable("workPSR_mq1", [
        -3.52,
        -1.67,
        0,
        15,
        330 + verticalScrollValue * 0.1,
        0,
        -8.45 + verticalScrollValue * 0.05,
      ]);
      CABLES.patch.setVariable("workPSR_mq2", [
        -3.52,
        -1.67,
        0,
        15,
        330 + verticalScrollValue * 0.1,
        0,
        -8.45 + verticalScrollValue * 0.05,
      ]);
    });
  }
});

// if (mq3.matches) {
//   //Smooth Animation
//   const lenis = new Lenis({
//     duration: 1.0,
//     easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
//     direction: "vertical",
//     gestureDirection: "vertical",
//     smooth: true,
//     smoothTouch: false,
//     touchMultiplier: 2,
//   });

//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);
// }
/////////// General Functions ///////////
