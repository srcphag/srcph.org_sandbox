//Set context
const currentURL = window.location.href;
var pageContext;
const path = "https://cdn.jsdelivr.net/gh/srcphag/srcph.org_sandbox@main/";

if (currentURL.includes("works")) {
  pageContext = "works";
} else if (currentURL.includes("404")) {
  pageContext = "404";
} else {
  pageContext = "index";
}
console.log(pageContext);
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
  const canvas = document.getElementById("glcanvas");
  const rect = canvas.getBoundingClientRect();

  document.addEventListener("mousemove", (event) => {
    // Step 1: Calculate coordinates relative to the canvas
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    // Step 2: Normalize to a 0-1 range
    var normX = canvasX / rect.width;
    var normY = canvasY / rect.height;

    // Step 3: Convert to -1 to 1 range (and flip y for WebGL, if needed)
    var ndcX = normX * 2 - 1;
    var ndcY = -(normY * 2 - 1); // flip y-axis

    CABLES.patch.setVariable("mouseX", ndcX);
    CABLES.patch.setVariable("mouseY", ndcY);
    //   console.log({
    //     canvasX,
    //     canvasY,
    //     normX,
    //     normY,
    //     ndcX,
    //     ndcY,
    //   });
  });

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
  const videoPlay = CABLES.patch.getVar("playerStatus");
  const videoFullscreen = CABLES.patch.getVar("videoFullscreen");
  const videoMuted = CABLES.patch.getVar("videoMuted");
  const isImage = CABLES.patch.getVar("isImage");
}

document.addEventListener("CABLES.jsLoaded", function (event) {
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
      videoMuted: isMuted,
      videoVolume: videoVolume,
      videoFullscreen: isFullscreen,
      mainColorHex: "#141414",
      indexPSR_mq3: [0.5, -0.5, -10, 10, 0, -20, 10],
      indexPSR_mq2: [0, 5, -2, 10, -40, 0, 0],
      indexPSR_mq1: [0, 5, 0, 15, -40, 0, 0],

      indexWorkPSR_mq3: [0.5, 0, 0, 5, 180, 50, 30],
      indexWorkPSR_mq2: [0.5, 0, 0, 5, 180, 50, 30],
      indexWorkPSR_mq1: [0, 2, 0, 15, 20, 20, 10],

      indexAboutPSR_mq3: [-0.5, 0, 0, 5, 250, 50, 50],
      indexAboutPSR_mq2: [-0.5, 0, 0, 5, 250, 50, 50],
      indexAboutPSR_mq1: [0, 8, 0, 15, 20, 20, 10],
      // WorkPage
      workPSR_mq3: [-1, -1, 0, 10, 90, 0, 0],
      workPSR_mq2: [0.5, 13, 0, 20, 200, -64, 0],
      workPSR_mq1: [0, -5, 0, 50, 180, 20, 20],

      errorPSR_mq3: [-1, 0, 0, 3, 0, -90, 10],
      errorPSR_mq2: [0, 5, -2, 10, -40, 0, 0],
      errorPSR_mq1: [0, 5, 0, 15, -40, 0, 0],

      imageTextureWrap: 0,
      autoTransformSpeed: 0.1,
      mouseTransformSpeed: 0.1,
      trailAmmount: 0.5,
    },
    patch: CABLES.exportedPatch,
    prefixAssetPath: path,
    silent: true,
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
    textureOffset();
  }
  if (pageContext == "index") {
    CABLES.patch.setVariable("videoPlay", 0);
  }
});

// disable rubberband effect on mobile devices
// document.getElementById("glcanvas").addEventListener(
//   "touchmove",
//   (e) => {
//     e.preventDefault();
//   },
//   false
// );
