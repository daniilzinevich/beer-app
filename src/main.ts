
import { getCurrentDate } from './utils';
import './style.css'
import { onSelect } from './router';
import { clear } from './utils';

export const DEFAULT_BEERS_COUNT = 3;
export let beers_now = DEFAULT_BEERS_COUNT;
export const container = document.getElementById('container');

/*     STARTUP ROUTINE    */
export let app_data = JSON.parse(localStorage.getItem("app_data")) ?? {};
if (app_data.beers_timestamp === getCurrentDate()) {
  beers_now =
    app_data.beers_left ??
    app_data?.settings?.beer_per_day ??
    DEFAULT_BEERS_COUNT;
} else {
  beers_now = app_data?.settings?.beer_per_day ?? DEFAULT_BEERS_COUNT;
}

export const saveMenuItem = (section: string) => {
  app_data.current_section = section;
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

export const saveBeerCounts = (beers_left: number, beers_timestamp: string) => {
  beers_now = beers_left
  app_data = {
    ...app_data,
    beers_left,
    beers_timestamp
  };
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

export const saveBeerSettings = (updatedSettings) => {
  app_data = {
    ...app_data,
    settings: {
      ...(app_data.settings ?? {}),
      ...updatedSettings
    }
  };
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

onSelect(
  document.querySelector(`[data-menu="${app_data.current_section ?? "today"}"]`)
);

document.querySelectorAll(".menu__item").forEach((item) => {
  item.addEventListener("click", (event) => {
    container && clear(container);
    onSelect(item);
    event.stopPropagation();
  });
});
