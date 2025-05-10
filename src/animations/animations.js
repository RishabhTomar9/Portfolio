import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeUpDownOnScroll = (selector) => {
  gsap.utils.toArray(selector).forEach((el) => {
    // Set initial state
    gsap.set(el, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'bottom 60%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(el, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: 'power2.in',
        });
      },
    });
  });
};



export const fadeInUp = (selector, duration = 0.5) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration, ease: 'power2.out' }
  );
};

export const staggerChildren = (selector, stagger = 0.2) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger,
      ease: 'power2.out',
    }
  );
};