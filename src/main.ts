import { onSelect } from './router';
import { app_data } from './store';
import { clear } from './utils';
import './style.css'

export const container = document.getElementById('container') as HTMLElement;

onSelect(
  container,
  document.querySelector(`[data-menu="${app_data.current_section ?? "today"}"]`)  as HTMLElement
);

document.querySelectorAll(".menu__item").forEach((item) => {
  item.addEventListener("click", (event) => {
    clear(container);
    onSelect(container, item as HTMLElement);
    event.stopPropagation();
  });
});
