document.addEventListener("CABLES.jsLoaded", function (event) {
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
    if (mq2.matches) {
      const backgroundMask1 = document.getElementById("backgroundMask1");
      const text1Position = document
        .querySelector("#text1")
        .getBoundingClientRect();
      backgroundMask1.style.height = `calc(100% - ${text1Position.bottom}px + 65px)`;
    }
    if (mq1.matches || mq2.matches) {
      const firstElement = document.getElementsByClassName("work")[0];

      firstElement.classList.add("visibleImage");

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
          scrollToSectionGsap("about", 2);
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
          scrollToSectionGsap("header", 1);
        }
      });

      const triggers = [
        {
          trigger: "#work",
          start: "top 70%",
          end: "bottom 50%",
          onEnter: () => {
            const nextElement = workElements[0];
            scrollToElement(nextElement, 1);
            highlightMenuItem(1);
          },
          onLeave: () => {
            scrollToSectionGsap("about", 1);
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

            // scrollToElement(previousElement, 1);
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
            CABLES.patch.setVariable("stringTexture", "mediaDesign");
            CABLES.patch.setVariable("mainColor", "#141414");
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
  }
});
