import './style.css'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faGlassWater, faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_BEERS_COUNT = 3;
let beers_now = DEFAULT_BEERS_COUNT;
const container = document.querySelector(".container");

const screens = {
  today: renderTodayScreen,
  calendar: () => {},
  settings: renderSettingsScreen
};

/*     STARTUP ROUTINE    */
let app_data = JSON.parse(localStorage.getItem("app_data")) ?? {};
if (app_data.beers_timestamp === getCurrentDate()) {
  beers_now =
    app_data.beers_left ??
    app_data?.settings?.beer_per_day ??
    DEFAULT_BEERS_COUNT;
} else {
  beers_now = app_data?.settings?.beer_per_day ?? DEFAULT_BEERS_COUNT;
}

const saveMenuItem = (section) => {
  app_data.current_section = section;
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

const saveBeerCounts = (beers_left, beers_timestamp) => {
  app_data = {
    ...app_data,
    beers_left,
    beers_timestamp
  };
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

const saveBeerSettings = (updatedSettings) => {
  app_data = {
    ...app_data,
    settings: {
      ...(app_data.settings ?? {}),
      ...updatedSettings
    }
  };
  localStorage.setItem("app_data", JSON.stringify(app_data));
};

let screenExitCallback = () => {};
const onSelect = (item) => {
  document
    .querySelector(".menu__item--active")
    ?.classList.remove("menu__item--active");
  item.classList.add("menu__item--active");
  screenExitCallback();
  const section = item.dataset.menu;
  screenExitCallback = screens[section]() ?? (() => {});
  saveMenuItem(section);
};
onSelect(
  document.querySelector(`[data-menu="${app_data.current_section ?? "today"}"]`)
);

document.querySelectorAll(".menu__item").forEach((item) => {
  item.addEventListener("click", (event) => {
    clear();
    onSelect(item);
    event.stopPropagation();
  });
});

/*     PAGES LOGIC    */
function clear() {
  container.innerText = "";
}

function renderTodayScreen() {
  container.append(//...icon(faGlassWater).node);
    ...Array(app_data?.settings?.beer_per_day ?? DEFAULT_BEERS_COUNT)
      .fill(0)
      .map((_, index) =>
        [...icon(app_data?.settings?.glass ? faGlassWater : faBeerMugEmpty).node]
      // createElement(
      //     "i",
      //     `beer fa-solid ${app_data?.settings?.glass ?? "fa-glass-water"} ${
      //       index >= beers_now ? "beer--empty" : ""
      //     }`
      //   )
      ).flat()
  );

  const reduceBeers = () => {
    saveBeerCounts(--beers_now, getCurrentDate());
    document.querySelectorAll(".beer").forEach((item, index) => {
      if (index >= beers_now) {
        item.classList.add("beer--empty");
      }
    });
  };

  document.addEventListener("click", reduceBeers);

  return () => document.removeEventListener("click", reduceBeers);
}

function renderSettingsScreen() {
  const updateSettings = (event) => {
    saveBeerSettings({
      [event.currentTarget.name]:
        event.currentTarget?.type === "number"
          ? Number(event.currentTarget.value)
          : event.currentTarget.value
    });
  };

  container.append(
    createElement("form", "settings", {}, [
      createElement("div", "settings__item", {}, [
        createElement("label", "", { for: "beers" }, ["Beers per day"]),
        createElement(
          "input",
          "",
          {
            id: "beers",
            type: "number",
            value: app_data?.settings?.beer_per_day ?? DEFAULT_BEERS_COUNT,
            name: "beer_per_day"
          },
          [],
          {
            input: updateSettings
          }
        )
      ]),
      createElement("div", "settings__item", {}, [
        createElement("label", "", { for: "language" }, ["Language"]),
        createElement(
          "select",
          "",
          {
            id: "language",
            name: "language"
          },
          [
            createElement(
              "option",
              "",
              { value: "en", selected: app_data?.settings?.language === "en" },
              ["English"]
            )
          ],
          {
            input: updateSettings
          }
        )
      ]),
      createElement("div", "settings__item", {}, [
        createElement("label", "", { for: "glass" }, ["Beer glass"]),
        createElement(
          "select",
          "",
          {
            id: "glass",
            name: "glass"
          },
          [
            createElement(
              "option",
              "",
              {
                value: true,
                selected: app_data?.settings?.glass
              },
              ["Glass"]
            ),
            createElement(
              "option",
              "",
              {
                value: false,
                selected: !app_data?.settings?.glass
              },
              ["Mug"]
            )
          ],
          {
            input: updateSettings
          }
        )
      ])
    ])
  );
}

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}
function createElement(
  tag,
  className,
  params = {},
  children = [],
  events = {}
) {
  const el = document.createElement(tag);
  el.className = className;
  Object.assign(el, params);
  children.forEach((item) => el.append(item));

  Object.keys(events).forEach((key) => el.addEventListener(key, events[key]));

  return el;
}
