import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faGlassWater,
  faBeerMugEmpty,
} from "@fortawesome/free-solid-svg-icons";

import { DEFAULT_BEERS_COUNT, GLASS_TYPE_GLASS } from "./const";
import { app_data, beers_now, saveBeerCounts } from "./store";
import { createElement, getCurrentDate } from "./utils";

export function renderTodayScreen(element: HTMLElement) {
  element.append(
    ...Array(app_data?.settings?.beer_per_day ?? DEFAULT_BEERS_COUNT)
      .fill(0)
      .map((_, index) =>
        createElement(
          "div",
          index >= beers_now ? "beer beer--empty" : "beer",
          {},
          [
            ...icon(
              app_data?.settings?.glass === GLASS_TYPE_GLASS
                ? faGlassWater
                : faBeerMugEmpty
            ).node,
          ]
        )
      )
  );

  document.addEventListener("click", reduceBeers);

  return () => document.removeEventListener("click", reduceBeers);
}

function reduceBeers() {
  saveBeerCounts(beers_now - 1, getCurrentDate());
  document.querySelectorAll(".beer").forEach((item, index) => {
    if (index >= beers_now) {
      item.classList.add("beer--empty");
    }
  });
}
