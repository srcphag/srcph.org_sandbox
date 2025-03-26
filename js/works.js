// Creating a video element container firs
const videoContainer = document.createElement("div");
videoContainer.id = "videoContainer";

// videoContainer.style.display = 'none';

document.addEventListener("CABLES.jsLoaded", function (event) {
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
    // console.log("videoUrl", imageUrls[0]);

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
    if (mq2.matches) {
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

    const playSVG =
      "url(https://cdn.prod.website-files.com/630ca11296e48c2b70f1013e/671cd597249480e4a65bb82c_controlPlay.svg)";
    const pauseSVG =
      "url(https://cdn.prod.website-files.com/630ca11296e48c2b70f1013e/671cd5b679fab7c290b04404_controlPause.svg)";

    const playText = "Play video";
    const pauseText = "Pause video";

    const soundOff = "Sound off";
    const soundOn = "Sound on";

    const fullScreenOn = "Fullscreen";
    const fullScreenOff = "Exit fullscreen";

    playButton.innerHTML = isPlaying ? pauseText : playText; // Set initial state
    mutedButton.innerHTML = isMuted ? soundOff : soundOn; // Set initial state
    fullscreenButton.innerHTML = isFullscreen ? fullScreenOff : fullScreenOn; // Set initial state

    function setVideoPlay() {
      isPlaying = !isPlaying;

      // Change the SVG
      playButton.innerHTML = isPlaying ? pauseText : playText;

      // Set the CABLES variable
      CABLES.patch.setVariable("videoPlay", isPlaying ? 1 : 0);
      CABLES.patch.setVariable("videoMuted", isMuted ? 1 : 0);
      CABLES.patch.setVariable("videoVolume", 1);
      console.log("Play");
    }

    playButton.addEventListener("click", () => {
      setVideoPlay();
    });

    mutedButton.addEventListener("click", () => {
      isMuted = !isMuted;
      // Change the SVG
      mutedButton.innerHTML = isMuted ? soundOff : soundOn;

      // Set the CABLES variable
      CABLES.patch.setVariable("videoMuted", isMuted ? 1 : 0);
      CABLES.patch.setVariable("videoVolume", isMuted ? 0 : 1);
      // console.log(isPlaying);
    });

    fullscreenButton.addEventListener("click", () => {
      isFullscreen = !isFullscreen;

      // Change the SVG
      fullscreenButton.innerHTML = isFullscreen ? fullScreenOff : fullScreenOn;
      srcShape.style.mixBlendMode = isFullscreen ? "normal" : "multiply";
      srcShape.style.zIndex = isFullscreen ? 10 : 5;

      // Set the CABLES variable
      CABLES.patch.setVariable("videoFullscreen", isFullscreen ? 1 : 0);
      if (mq1.matches && isFullscreen == true) {
        document.getElementById("playerControls").style.top = "100vh";
      }
      if (mq1.matches && isFullscreen == false) {
        document.getElementById("playerControls").style.top = "60vh";
      }
      // console.log(isPlaying);
    });

    // Mouse controls for larger screens
    if (mq3.matches) {
      const playerControls = document.getElementById("playerControls");
      let timeout;
      let isHovering = false;

      function showControls() {
        playerControls.style.opacity = "1";
        clearTimeout(timeout);
        if (!isHovering) {
          timeout = setTimeout(hideControls, 2000);
        }
      }

      function hideControls() {
        if (!isHovering) {
          playerControls.style.opacity = "0";
        }
      }

      playerControls.style.transition = "opacity 0.3s ease";
      playerControls.style.opacity = "0";

      // Mouse event listeners
      document.addEventListener("mousemove", showControls);

      playerControls.addEventListener("mouseenter", () => {
        isHovering = true;
        showControls();
        clearTimeout(timeout);
      });

      playerControls.addEventListener("mouseleave", () => {
        isHovering = false;
        timeout = setTimeout(hideControls, 2000);
      });
    }

    if (mq2.matches) {
      const playerControls = document.getElementById("playerControls");
      let timeout;

      function showTouchControls() {
        playerControls.style.opacity = "1";
        clearTimeout(timeout);

        updateControlsVisibility();
      }

      function hideTouchControls() {
        if (!isTouching && isPlaying) {
          playerControls.style.opacity = "0";
        }
      }

      function updateControlsVisibility() {
        if (!isPlaying) {
          // If video is not playing, show controls and clear any hide timeout
          playerControls.style.opacity = "1";
          clearTimeout(timeout);
        } else if (!isTouching) {
          // If video is playing and not touching, start hide timeout
          timeout = setTimeout(hideTouchControls, 2000);
        }
      }

      playerControls.style.transition = "opacity 0.3s ease";
      // Initial visibility based on playing state
      updateControlsVisibility();

      playButton.addEventListener("click", () => {
        setVideoPlay();
        updateControlsVisibility();
      });
      // Touch event listeners
      document.addEventListener("touchstart", () => {
        isTouching = true;
        showTouchControls();
      });

      document.addEventListener("touchend", () => {
        isTouching = false;
        updateControlsVisibility();
      });
    }

    const mainElement = document.querySelector("main");
    let workPSR_mq1_A = CABLES.patch.getVar("workPSR_mq1").getValue();
    let workPSR_mq1_B = workPSR_mq1_A.slice(); // Creates a shallow copy
    workPSR_mq1_B[1] += 5;

    mainElement.addEventListener("scroll", () => {
      const scrollPercentage =
        mainElement.scrollTop /
        (mainElement.scrollHeight - mainElement.clientHeight);

      CABLES.patch.setVariable(
        "workPSR_mq1",
        lerpArrays(workPSR_mq1_A, workPSR_mq1_B, scrollPercentage)
      );

      // CABLES.patch.setVariable(
      //   "workPSR_mq2",
      //   (workPSR_mq1[3] += remap(scrollPercentage, 0, 1, -1, 1))
      // );
    });
  }
});
