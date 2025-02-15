const logo = document.getElementById("logo");
const gridItems = document.querySelectorAll(".work");
const headerSection = document.querySelector("#header");
const workSection = document.querySelector("#workList");
const aboutSection = document.querySelector("#about");
const workElements = Array.from(document.querySelectorAll(".work"));
const observerRoot = document.querySelector("#intersectionObserver");

const mask1 = document.getElementById("canvasMask1");
const mask2 = document.getElementById("canvasMask2");
const mask3 = document.getElementById("canvasMask3");
const mask4 = document.getElementById("canvasMask4");
const mask5 = document.getElementById("canvasMask5");

let mainColor;
let isScrolling = false;


