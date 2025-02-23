document.addEventListener("CABLES.jsLoaded", function (event) {
  /////////// Context Index ///////////

  if (pageContext == "index") {
    const usedPositions = new Set();

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
      const numRows = 5;
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

      workElements.forEach((container) => {
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

      workElements.forEach((container) => {
        const descriptionElement = container.querySelector(".description");
        const titleElement = container.querySelector(".title");

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          descriptionElement,
          {
            x: -30,
          },
          {
            x: 0,
            duration: 0.2,
            ease: "power2.out",
          }
        );

        container.addEventListener("mouseenter", (event) => {
          container.classList.add("workIndex");
          titleElement.classList.add("textVisible");
          descriptionElement.classList.add("visibleDescription");
          tl.progress(0);
          tl.play();
        });

        container.addEventListener("mouseleave", () => {
          container.classList.remove("workIndex");
          titleElement.classList.remove("textVisible");
          descriptionElement.classList.remove("visibleDescription");
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
            scrollToSectionGsap("collection-list", 2, 65);
            highlightMenuItem(1);
          },
          onLeave: () => {
            scrollToSectionGsap("about", 2, 0);
            highlightMenuItem(2);
          },
          onEnterBack: () => {
            scrollToSectionGsap("collection-list", 2, 65);
            highlightMenuItem(1);
          },
          onLeaveBack: () => {
            scrollToSectionGsap("header", 2, 0);
            highlightMenuItem(2);
          },
        },
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
      let triggers;
      let marginBottom;

      if (mq2.matches) {
        triggers = [
          {
            trigger: "#work",
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
              scrollToSectionGsap("work", 1, "65");
              highlightMenuItem(1);
            },
            onLeave: () => {
              scrollToSectionGsap("about", 1);
              highlightMenuItem(2);
            },
            onEnterBack: () => {
              // scrollToLastWork(".work", 1, "65");
              highlightMenuItem(1);
            },
            onLeaveBack: () => {
              scrollToSectionGsap("header", 1);
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
              CABLES.patch.setVariable("stringTexture", "mediaDesign");
              CABLES.patch.setVariable("mainColor", "#141414");
            },
          },
          // Add more triggers here if needed
        ];
        marginBottom = vhToPx(35);
      }

      if (mq1.matches) {
        triggers = [
          {
            trigger: "#work",
            start: "top 90%",
            end: "bottom 60%",
            onEnter: () => {
              scrollToSectionGsap("work", 1, "65");
              highlightMenuItem(1);
            },
            onLeave: () => {
              scrollToSectionGsap("about", 1);
              highlightMenuItem(2);
            },
            onEnterBack: () => {
              scrollToLastWork(".work", 1, "65");
              highlightMenuItem(1);
            },
            onLeaveBack: () => {
              scrollToSectionGsap("header", 1);
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
              CABLES.patch.setVariable("stringTexture", "mediaDesign");
              CABLES.patch.setVariable("mainColor", "#141414");
            },
          },
          // Add more triggers here if needed
        ];
        marginBottom = vhToPx(10);
      }

      function onElementVisible(element) {
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
      }

      function onElementHidden(element) {
        element.classList.remove("visibleImage", "active");

        const titleElement = element.querySelector(".title");
        titleElement?.classList.remove("visibleTitle");

        const descriptionElement = element.querySelector(".description");
        descriptionElement?.classList.remove("visibleDescription");

        const videoElement = element.querySelector(".videojs-work");
        if (videoElement) {
          const player = videojs(videoElement);
          player.muted(true);
          player.pause();
        }
      }

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            // Calculate visible area
            const visibleArea =
              entry.intersectionRect.width * entry.intersectionRect.height;
            const totalArea =
              entry.boundingClientRect.width * entry.boundingClientRect.height;
            const visiblePercentage = Math.round(entry.intersectionRatio * 100);

            if (entry.isIntersecting) {
              onElementVisible(entry.target);
              // console.log("Element is visible:", {
              //   element: entry.target,
              //   visibleArea: Math.round(visibleArea) + "px²",
              //   totalArea: Math.round(totalArea) + "px²",
              //   visiblePercentage: visiblePercentage + "%",
              //   dimensions: {
              //     width: Math.round(entry.intersectionRect.width) + "px",
              //     height: Math.round(entry.intersectionRect.height) + "px",
              //   },
              // });
            } else {
              onElementHidden(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: `65px 0px -${marginBottom}px 0px`,
          threshold: 1.0, // Multiple thresholds for more detailed tracking
        }
      );

      // Find all elements with class 'work' and observe them
      workElements.forEach((element) => {
        observer.observe(element);
      });

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

    // Mask positions

    if (mq1.matches || mq2.matches || mq3.matches) {
      mask4.style.height = String(getElementPosition("#text1").bottom) + "px";

      // Track position of the mask

      function updatePosition() {
        if (workList && mask1 && mask5) {
          const rect = workList.getBoundingClientRect();
          var WorkHeight = workList.offsetHeight;

          mask1.style.transform = `translateY(${rect.top + window.scrollY}px)`;
          mask1.style.height = `${WorkHeight}px`;
          mask5.style.transform = `translateY(${
            rect.bottom + window.scrollY
          }px)`;
        }
      }
      requestAnimationFrame(function animate() {
        updatePosition();
        requestAnimationFrame(animate);
      });
    }

    if (mq2.matches) {
      const deco3 = document.getElementById("deco3");
      deco3.style.top = String(getElementPosition("#text1").bottom) + "px";

      const backgroundMask1 = document.getElementById("backgroundMask1");
      const text1Position = document
        .querySelector("#text1")
        .getBoundingClientRect();
      backgroundMask1.style.height = `calc(100% - ${text1Position.bottom}px + 65px)`;
    }
    if (mq1.matches) {
      const deco3 = document.getElementById("deco3");
      deco3.style.top = String(getElementPosition("#text1").bottom) + "px";
    }
  }
});
