import { renderSettingsScreen } from './SettingsScreen';
import { renderTodayScreen } from './TodayScreen';
import { saveMenuItem } from './store';

type Screen = (element: HTMLElement) => ((() => void) | void)

const screens: Record<string, Screen> = {
  today: renderTodayScreen,
  calendar: () => { },
  settings: renderSettingsScreen
};
let screenExitCallback = () => { };

export const onSelect = (container: HTMLElement, item: HTMLElement) => {
  document
    .querySelector(".menu__item--active")
    ?.classList.remove("menu__item--active");
  item.classList.add("menu__item--active");
  screenExitCallback();
  const section = item.dataset.menu as string;
  screenExitCallback = screens[section](container as HTMLElement) ?? (() => { });
  saveMenuItem(section);
};
