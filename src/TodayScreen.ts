import { icon } from '@fortawesome/fontawesome-svg-core';
import { faGlassWater, faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { createElement, getCurrentDate } from './utils';
import { app_data, DEFAULT_BEERS_COUNT, saveBeerCounts, beers_now } from './main';

export function renderTodayScreen(element: HTMLElement) {
  element.append(
    ...Array(app_data?.settings?.beer_per_day ?? DEFAULT_BEERS_COUNT)
      .fill(0)
      .map((_, index) =>
        createElement("div", index >= beers_now ? "beer--empty" : "", {}, [
          ...icon(app_data?.settings?.glass ? faGlassWater : faBeerMugEmpty)
            .node,
        ])
      )
  );

  const reduceBeers = () => {
    saveBeerCounts(beers_now - 1, getCurrentDate());
    document.querySelectorAll(".beer").forEach((item, index) => {
      if (index >= beers_now) {
        item.classList.add("beer--empty");
      }
    });
  };

  document.addEventListener("click", reduceBeers);

  return () => document.removeEventListener("click", reduceBeers);
}
