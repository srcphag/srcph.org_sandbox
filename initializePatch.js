//Set context
const currentURL = window.location.href;
var pageContext;
const path = "https://cdn.jsdelivr.net/gh/srcphag/srcph.org_sandbox@main/";

if (currentURL.includes("works")) {
  pageContext = "works";
} else {
  pageContext = "index";
}
var bodyElement = document.body;
bodyElement.setAttribute("context", pageContext);

function textureOffset() {
  if (mq1.matches) {
    CABLES.patch.setVariable("imageTextureOffset", [0, -0.15]);
  }
  if (mq2.matches) {
    CABLES.patch.setVariable("imageTextureOffset", [0, -0.4]);
  }
  if (mq3.matches) {
    CABLES.patch.setVariable("imageTextureOffset", [0, 0]);
  }
}

//initialize Patch

function showError(errId, errMsg) {}

let initCount = 0;
let hasInitialized = false;

function patchInitialized(patch) {
  if (hasInitialized) {
    //console.log("Skipping repeated initialization");
    return;
  }

  initCount++;
  // console.log(`Patch Initialized - Attempt: ${initCount}`, {
  //   timestamp: new Date().toISOString(),
  // });

  // Mark as initialized
  hasInitialized = true;

  // Your actual initialization logic here
  // ...
}

function patchFinishedLoading(patch) {
  console.log("Loaded");
  const videoPlay = CABLES.patch.getVar("playerStatus");
  const videoFullscreen = CABLES.patch.getVar("videoFullscreen");
  const videoMuted = CABLES.patch.getVar("videoMuted");
  const isImage = CABLES.patch.getVar("isImage");

  // videoPlay.on("change", function (newValue) {
  //   if (newValue == 1) {
  //     controlPlayElement.classList.add("playerPause");
  //   } else {
  //     controlPlayElement.classList.remove("playerPause");
  //   }
  // });
  // videoFullscreen.on("change", function (newValue) {
  //   if (newValue == 1) {
  //   }
  // });
  // videoMuted.on("change", function (newValue) {
  //   if (newValue == 1) {
  //     controlAudioElement.classList.add("playerMute");
  //   } else {
  //     controlAudioElement.classList.remove("playerMute");
  //   }
  // });
  // isImage.on("change", function (newValue) {
  //   const playerControls = document.getElementById("playerControls");
  //   if (newValue == 1) {
  //     playerControls.style.display = "none";
  //   } else {
  //     playerControls.style.display = "flex";
  //   }
  // });
}

document.addEventListener("CABLES.jsLoaded", function (event) {
  let isPlaying = 0;

  CABLES.patch = new CABLES.Patch({
    variables: {
      pageContext: pageContext,
      mediaQuery: currentMediaQuery,
      videoUrl: "",
      imageUrl: "",
      stringTexture: "mediaDesign",
      workScroll: 0,
      aboutScroll: 0,
      videoPlay: isPlaying,
      videoMuted: 1,
      mainColorHex: "#141414",
      indexPSR_mq3: [0.5, -0.5, 0, 10, 0, -20, 10],
      indexPSR_mq2: [0, 5, -2, 10, -40, 0, 0],
      indexPSR_mq1: [0, 5, -2, 10, -40, 0, 0],
      indexWorkPSR_mq3: [0.5, 0, 0, 5, 180, 50, 30],
      indexAboutPSR_mq3: [-0.5, 0, 0, 5, 250, 50, 50],
      // WorkPage
      workPSR_mq3: [-1, -1, 0, 10, 90, 0, 0],
      workPSR_mq2: [0.5, 6, 0, 12, 200, -64, 0],
      workPSR_mq1: [-3.52, -1.67, 0, 15, 330, 0, -8.45],
      imageTextureWrap: 0,
      moveAutoSpeed: 0.5,
    },
    patch: CABLES.exportedPatch,
    prefixAssetPath: path,
    assetPath: path,
    jsPath: path,
    glCanvasId: "glcanvas",
    glCanvasResizeToWindow: true,
    onError: showError,
    onPatchLoaded: patchInitialized,
    onFinishedLoading: patchFinishedLoading,
    canvas: { alpha: true, premultipliedAlpha: true }, // make canvas transparent
  });
  if (pageContext == "works") {
    const playButton = document.getElementById("play");
    const glcanvas = document.getElementById("glcanvas");

    const playSVG =
      "url(https://cdn.prod.website-files.com/630ca11296e48c2b70f1013e/671cd597249480e4a65bb82c_controlPlay.svg)";
    const pauseSVG =
      "url(https://cdn.prod.website-files.com/630ca11296e48c2b70f1013e/671cd5b679fab7c290b04404_controlPause.svg)";

    CABLES.patch.setVariable("videoPlay", isPlaying ? 1 : 0);
    playButton.style.backgroundImage = isPlaying ? pauseSVG : playSVG; // Set initial state

    playButton.addEventListener("click", () => {
      isPlaying = !isPlaying;

      // Change the SVG
      playButton.style.backgroundImage = isPlaying ? pauseSVG : playSVG;

      // Set the CABLES variable
      CABLES.patch.setVariable("videoPlay", isPlaying ? 1 : 0);
      CABLES.patch.setVariable("videoMuted", 0);
      // console.log(isPlaying);
    });
    textureOffset();
  }
  if (pageContext == "index") {
    CABLES.patch.setVariable("videoPlay", 0);
  }
});

// disable rubberband effect on mobile devices
document.getElementById("glcanvas").addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  false
);
