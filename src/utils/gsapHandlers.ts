import { gsap } from "gsap";

export const handleMouseEnter = (element: HTMLDivElement) => {
  if (!element.dataset.initialLeft || !element.dataset.initialTop) {
    element.dataset.initialLeft = element.style.left;
    element.dataset.initialTop = element.style.top;
  }

  gsap.to(element, {
    width: 56,
    height: 56,
    backgroundColor: "#F4F5F9",
    borderRadius: "50%",
    border: "1px solid #303E5880",
    ease: "power2.out",
    duration: 0.5,
    left: `${parseFloat(element.dataset.initialLeft!) - 25}px`,
    top: `${parseFloat(element.dataset.initialTop!) - 25}px`,
  });
  gsap.to(element.querySelector("span"), { opacity: 1, duration: 0.3 });
  gsap.to(element.querySelector(".circle-button-text"), { opacity: 1, duration: 0.3 });
};

export const handleMouseLeave = (element: HTMLDivElement, index: number, currentData: number) => {
  if (currentData === index) return;

  gsap.to(element, {
    width: 6,
    height: 6,
    backgroundColor: "#42567A",
    borderRadius: "50%",
    border: "none",
    ease: "power2.out",
    duration: 0.5,
    left: element.dataset.initialLeft,
    top: element.dataset.initialTop,
  });

  gsap.to(element.querySelector("span"), { opacity: 0, duration: 0.3 });
  gsap.to(element.querySelector(".circle-button-text"), { opacity: 0, duration: 0.3 });
};

export const handleClickAnimation = (container: HTMLDivElement, onComplete: () => void) => {
  gsap.to(container, {
    rotation: "+=360",
    duration: 1,
    ease: "power2.out",
    onComplete,
  });
};
