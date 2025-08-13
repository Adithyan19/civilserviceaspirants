import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const initializeAnimations = () => {
    // Set default GSAP settings
    gsap.defaults({
        ease: "power2.out",
        duration: 1,
    });

    // Smooth scrolling for anchor links
    gsap.registerEffect({
        name: "smoothScroll",
        effect: (targets: any, config: any) => {
            const tl = gsap.timeline();

            targets.forEach((target: HTMLElement) => {
                target.addEventListener("click", (e) => {
                    e.preventDefault();
                    const href = target.getAttribute("href");
                    if (href && href.startsWith("#")) {
                        const element = document.querySelector(href);
                        if (element) {
                            gsap.to(window, {
                                duration: 1.5,
                                scrollTo: { y: element, offsetY: 80 },
                                ease: "power2.inOut",
                            });
                        }
                    }
                });
            });

            return tl;
        },
        defaults: { duration: 1.5 },
    });

    // Initialize locomotive scroll alternative using GSAP
    initializeSmoothScroll();
};

const initializeSmoothScroll = () => {
    let currentY = 0;
    let targetY = 0;
    const ease = 0.1;

    const updateScroll = () => {
        targetY = window.scrollY;
        currentY += (targetY - currentY) * ease;

        // Apply smooth scroll effect to body
        document.body.style.transform = `translateY(${-currentY}px)`;

        requestAnimationFrame(updateScroll);
    };

    // Start smooth scroll on desktop only
    if (window.innerWidth > 768) {
        document.body.style.position = "fixed";
        document.body.style.top = "0";
        document.body.style.left = "0";
        document.body.style.width = "100%";
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";

        document.documentElement.style.height = `${document.body.scrollHeight}px`;

        updateScroll();
    }
};

// Utility functions for common animations
export const fadeInUp = (element: HTMLElement, delay = 0) => {
    return gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay, ease: "power2.out" },
    );
};

export const fadeInLeft = (element: HTMLElement, delay = 0) => {
    return gsap.fromTo(
        element,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay, ease: "power2.out" },
    );
};

export const fadeInRight = (element: HTMLElement, delay = 0) => {
    return gsap.fromTo(
        element,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay, ease: "power2.out" },
    );
};

export const scaleIn = (element: HTMLElement, delay = 0) => {
    return gsap.fromTo(
        element,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay, ease: "back.out(1.7)" },
    );
};

export const staggerAnimation = (
    elements: NodeListOf<Element> | Element[],
    delay = 0.1,
) => {
    return gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: delay, ease: "power2.out" },
    );
};
