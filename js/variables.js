const logo = document.getElementById("logo");
const gridItems = document.querySelectorAll(".work");
const headerSection = document.querySelector("#header");
const workSection = document.querySelector("#workList");
const aboutSection = document.querySelector("#about");
const workElements = Array.from(document.querySelectorAll(".work"));
const observerRoot = document.querySelector("#intersectionObserver");
const srcShape = document.querySelector(".srcshape");
const navBar = document.querySelector(".navbar");

const mask1 = document.getElementById("canvasMask1");
const mask2 = document.getElementById("canvasMask2");
const mask3 = document.getElementById("canvasMask3");
const mask4 = document.getElementById("canvasMask4");
const mask5 = document.getElementById("canvasMask5");

const playButton = document.getElementById("play");
const mutedButton = document.getElementById("mute");
const fullscreenButton = document.getElementById("fullScreen");

let isPlaying = false;
let isMuted = true;
let isFullscreen = false;
let videoVolume = 0;

let mainColor;
let isScrolling = false;
