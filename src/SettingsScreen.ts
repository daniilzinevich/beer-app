import { createElement } from './utils';
import { saveBeerSettings, app_data, DEFAULT_BEERS_COUNT } from './main';

export function renderSettingsScreen(element: HTMLElement) {
  const updateSettings = (event: Event) => {
    const target: HTMLInputElement = event.currentTarget as HTMLInputElement
    saveBeerSettings({
      [target.name]: target?.type === "number"
        ? Number(target.value)
        : target.value
    });
  };

  element.append(
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
