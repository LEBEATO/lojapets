"use client";

const CART_TARGET_SELECTOR = "[data-cart-target]";
const CART_ITEM_ADDED_EVENT = "cart:item-added";

function notifyCartArrival() {
  window.dispatchEvent(new CustomEvent(CART_ITEM_ADDED_EVENT));
}

export function flyProductToCart(imageUrl: string, sourceElement: HTMLElement | null) {
  if (typeof window === "undefined" || !sourceElement) return;

  const target = document.querySelector<HTMLElement>(CART_TARGET_SELECTOR);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!target || reduceMotion) {
    notifyCartArrival();
    return;
  }

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const size = Math.min(Math.max(sourceRect.width * 0.42, 44), 82);

  const flyer = document.createElement("img");
  flyer.src = imageUrl;
  flyer.alt = "";
  flyer.setAttribute("aria-hidden", "true");
  flyer.style.position = "fixed";
  flyer.style.left = `${sourceRect.left + sourceRect.width / 2 - size / 2}px`;
  flyer.style.top = `${sourceRect.top + sourceRect.height / 2 - size / 2}px`;
  flyer.style.width = `${size}px`;
  flyer.style.height = `${size}px`;
  flyer.style.objectFit = "contain";
  flyer.style.padding = "6px";
  flyer.style.borderRadius = "18px";
  flyer.style.background = "rgba(255,255,255,0.96)";
  flyer.style.boxShadow = "0 16px 40px rgba(15, 23, 42, 0.2)";
  flyer.style.pointerEvents = "none";
  flyer.style.zIndex = "9999";
  flyer.style.willChange = "transform, opacity";

  document.body.appendChild(flyer);

  const deltaX = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
  const deltaY = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

  const animation = flyer.animate(
    [
      { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
      { transform: `translate3d(${deltaX * 0.48}px, ${deltaY * 0.32 - 42}px, 0) scale(0.82)`, opacity: 0.95, offset: 0.48 },
      { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.28)`, opacity: 0.15 },
    ],
    {
      duration: 620,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    },
  );

  animation.addEventListener("finish", () => {
    flyer.remove();
    notifyCartArrival();
  });

  animation.addEventListener("cancel", () => flyer.remove());
}

export { CART_ITEM_ADDED_EVENT };
