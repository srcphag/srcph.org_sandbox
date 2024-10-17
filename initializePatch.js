//Set context
const currentURL = window.location.href;
var pageContext;

if (currentURL.includes("works")) {
  pageContext = "works";
} else {
  pageContext = "index";
}
var bodyElement = document.body;
bodyElement.setAttribute("context", pageContext);

//initialize Patch

function showError(errId, errMsg) {}

function patchInitialized(patch) {}

function patchFinishedLoading(patch) {
  const videoPlay = CABLES.patch.getVar("playerStatus");
  const videoFullscreen = CABLES.patch.getVar("videoFullscreen");
  const videoMuted = CABLES.patch.getVar("videoMuted");
  const isImage = CABLES.patch.getVar("isImage");

  // will be called every time value changes
  const controlPlayElement = document.getElementById("controlPlay");
  const controlAudioElement = document.getElementById("controlAudio");

  videoPlay.on("change", function (newValue) {
    if (newValue == 1) {
      controlPlayElement.classList.add("playerPause");
    } else {
      controlPlayElement.classList.remove("playerPause");
    }
  });
  videoFullscreen.on("change", function (newValue) {
    if (newValue == 1) {
    }
  });
  videoMuted.on("change", function (newValue) {
    if (newValue == 1) {
      controlAudioElement.classList.add("playerMute");
    } else {
      controlAudioElement.classList.remove("playerMute");
    }
  });
  isImage.on("change", function (newValue) {
    const playerControls = document.getElementById("playerControls");
    if (newValue == 1) {
      playerControls.style.display = "none";
    } else {
      playerControls.style.display = "flex";
    }
  });
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
    },
    patch: CABLES.exportedPatch,
    prefixAssetPath: "https://gq3j9h.csb.app/",
    assetPath: "https://gq3j9h.csb.app/",
    jsPath: "https://gq3j9h.csb.app/",
    glCanvasId: "glcanvas",
    glCanvasResizeToWindow: true,
    onError: showError,
    onPatchLoaded: patchInitialized,
    onFinishedLoading: patchFinishedLoading,
    canvas: { alpha: true, premultipliedAlpha: true }, // make canvas transparent
  });
});

// disable rubberband effect on mobile devices
document.getElementById("glcanvas").addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  false,
);
