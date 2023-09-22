import type { TransitionDirectionalAnimations } from "astro";

const EASE_IN_OUT_QUART = "cubic-bezier(0.76, 0, 0.24, 1)";

interface CreateSlideSetting {
  direction?: "Left" | "Right" | "Top" | "Bottom";
  duration?: string;
  oldSlide?: boolean;
  newSlide?: boolean;
  backwardReverse?: boolean;
}

export function createSlide(
  setting: CreateSlideSetting = {}
): TransitionDirectionalAnimations {
  const {
    direction = "Top",
    duration,
    oldSlide = true,
    newSlide = true,
    backwardReverse = false,
  } = setting;
  const reverse = {
    Left: "Right",
    Right: "Left",
    Top: "Bottom",
    Bottom: "Top",
  }[direction!];
  return {
    forwards: {
      old: [
        {
          name: "astroFadeOut",
          duration: duration ?? "90ms",
          easing: EASE_IN_OUT_QUART,
          fillMode: "both",
        },
        ...(oldSlide
          ? [
              {
                name: `astroSlideTo${direction}`,
                duration: duration ?? "220ms",
                easing: EASE_IN_OUT_QUART,
                fillMode: "both",
              },
            ]
          : []),
      ],
      new: [
        {
          name: "astroFadeIn",
          duration: duration ?? "210ms",
          easing: EASE_IN_OUT_QUART,
          delay: duration ? undefined : "30ms",
          fillMode: "both",
        },
        ...(newSlide
          ? [
              {
                name: `astroSlideFrom${reverse}`,
                duration: duration ?? "220ms",
                easing: EASE_IN_OUT_QUART,
                fillMode: "both",
              },
            ]
          : []),
      ],
    },
    backwards: {
      old: [
        { name: "astroFadeOut" },
        ...((backwardReverse ? oldSlide : newSlide)
          ? [{ name: `astroSlideTo${backwardReverse ? direction : reverse}` }]
          : []),
      ],
      new: [
        { name: "astroFadeIn" },
        ...((backwardReverse ? newSlide : oldSlide)
          ? [{ name: `astroSlideFrom${backwardReverse ? reverse : direction}` }]
          : []),
      ],
    },
  };
}
