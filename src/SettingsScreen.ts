import { DEFAULT_BEERS_COUNT, GLASS_TYPE_GLASS, GLASS_TYPE_MUG } from './const';
import { saveBeerSettings, app_data } from './store';
import { createElement } from './utils';

export function renderSettingsScreen(element: HTMLElement) {
  element.append(
    createElement("form", "settings", {}, [
      beers_per_day(updateSettings),
      language(updateSettings),
      glass(updateSettings)
    ])
  );
}

function updateSettings(event: Event) {
  const target: HTMLInputElement = event.currentTarget as HTMLInputElement;
  saveBeerSettings({
    [target.name]: target?.type === "number"
      ? Number(target.value)
      : target.value
  });
}

function beers_per_day(updateSettings: (event: Event) => void): string | Node {
  return createElement("div", "settings__item", {}, [
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
  ]);
}

function glass(updateSettings: (event: Event) => void): string | Node {
  return createElement("div", "settings__item", {}, [
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
            value: GLASS_TYPE_GLASS,
            selected: app_data?.settings?.glass === GLASS_TYPE_GLASS
          },
          ["Glass"]
        ),
        createElement(
          "option",
          "",
          {
            value: GLASS_TYPE_MUG,
            selected: app_data?.settings?.glass === GLASS_TYPE_MUG
          },
          ["Mug"]
        )
      ],
      {
        input: updateSettings
      }
    )
  ]);
}

function language(updateSettings: (event: Event) => void): string | Node {
  return createElement("div", "settings__item", {}, [
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
  ]);
}
