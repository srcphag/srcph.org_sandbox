gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function handleScrollProgress(progress, variableName) {
  CABLES.patch.setVariable(variableName, progress);
}

function setPSR(variable, values) {
  CABLES.patch.setVariable(variable, values);
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

function remap(value, inMin, inMax, outMin, outMax) {
  // First normalize to 0-1
  const normalized = (value - inMin) / (inMax - inMin);
  // Then scale to output range
  return normalized * (outMax - outMin) + outMin;
}

function lerpArrays(arr1, arr2, t) {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must be the same length");
  }

  return arr1.map((value, index) => {
    return lerp(value, arr2[index], t);
  });
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
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

function scrollToSectionGsap(sectionName, durationLenght, offset = 0) {
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
function scrollToLastWork(sectionName, durationLength = 1, offset = 0) {
  // Get all elements with class 'work' and take the last one
  const workElements = document.querySelectorAll(sectionName);
  const lastWorkElement = workElements[workElements.length - 1];

  if (lastWorkElement) {
    isScrolling = true;
    gsap.to(window, {
      duration: durationLength,
      scrollTo: {
        y: lastWorkElement,
        offsetY: offset,
        autoKill: false,
      },
      ease: "power3.out",
      onComplete: () => {
        isScrolling = false;
      },
    });
  }
}
// function scrollToElement(element, durationLength = 1) {
//   return new Promise((resolve) => {
//     // If already scrolling, queue this scroll
//     if (isScrolling) {
//       setTimeout(() => scrollToElement(element, durationLength), 100);
//       return;
//     }

//     isScrolling = true;

//     // Helper function to cleanup previous elements
//     const cleanupPreviousElements = () => {
//       workElements.forEach((el) => {
//         el.classList.remove("visibleImage", "active");

//         const titleElement = el.querySelector(".title");
//         titleElement?.classList.remove("visibleTitle");

//         const descriptionElement = el.querySelector(".description");
//         descriptionElement?.classList.remove("visibleDescription");

//         const videoElement = el.querySelector(".videojs-work");
//         if (videoElement) {
//           const player = videojs(videoElement);
//           player.muted(true);
//           player.pause();
//         }
//       });
//     };

//     // Helper function to setup new element
//     const setupNewElement = () => {
//       element.classList.add("visibleImage", "active");

//       const titleElement = element.querySelector(".title");
//       titleElement?.classList.add("visibleTitle");

//       const descriptionElement = element.querySelector(".description");
//       descriptionElement?.classList.add("visibleDescription");

//       // Update main color if available
//       const mainColor = element.getAttribute("color");
//       if (mainColor && CABLES?.patch) {
//         CABLES.patch.setVariable("mainColorHex", mainColor);
//       }

//       // Handle video playback
//       const videoElement = element.querySelector(".videojs-work");
//       if (videoElement) {
//         const player = videojs(videoElement);
//         player.muted(true);
//         player.play().catch(console.error);
//       }
//     };

//     // Cleanup previous state
//     cleanupPreviousElements();

//     if (element) {
//       // Calculate the exact scroll position
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - 65;
//       console.log("Scroll to:", element.getAttribute("project"));
//       // Perform the scroll animation
//       gsap.to(window, {
//         duration: durationLength,
//         scrollTo: {
//           y: offsetPosition,
//           autoKill: false,
//         },
//         ease: "power3.Out", // Smoother easing
//         onStart: () => {
//           // Add a class to prevent other scrolling during animation
//           document.body.classList.add("is-scrolling");
//         },
//         onComplete: () => {
//           setupNewElement();

//           // Small delay to ensure everything is settled
//           setTimeout(() => {
//             isScrolling = false;
//             document.body.classList.remove("is-scrolling");
//             resolve();
//           }, 50);
//         },
//       });
//     }
//   });
// }
function vhToPx(vh) {
  return (window.innerHeight * vh) / 100;
}
function onElementVisible(element) {
  console.log("Element is now visible:", element);
  // Add your custom functionality for visible state here
}

function onElementHidden(element) {
  console.log("Element is now hidden:", element);
  // Add your custom functionality for hidden state here
}

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
