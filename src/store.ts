import { getCurrentDate } from './utils';
import { DEFAULT_BEERS_COUNT } from './const';

export let beers_now = DEFAULT_BEERS_COUNT;

export let app_data = JSON.parse(localStorage.getItem("app_data") as string) ?? {};
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
  beers_now = beers_left;
  app_data = {
    ...app_data,
    beers_left,
    beers_timestamp
  };
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

export const saveBeerSettings = (updatedSettings: Record<string, string | number>) => {
  app_data = {
    ...app_data,
    settings: {
      ...(app_data.settings ?? {}),
      ...updatedSettings
    }
  };
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

