export function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

export function createElement(
  tag: string,
  className: string,
  params: Record<string, string | boolean> = {},
  children: Array<string | Node> = [],
  events: Record<string, (event: Event) => void> = {}
): HTMLElement {
  const el = document.createElement(tag);
  el.className = className;
  Object.assign(el, params);
  children.forEach((item) => el.append(item));

  Object.keys(events).forEach((key) => el.addEventListener(key, events[key]));

  return el;
}

export function clear(element: HTMLElement) {
  element.innerText = "";
}
