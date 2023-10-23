import { ICONS } from "pages/common";
import { MenuItemType } from "../appConstants";
import { LINKS } from "./links";

export const MENU_ITEMS = [
  {
    key: "dash",
    label: "Dashbords",
    isTitle: false,
    icon: "uil-home-alt",
    children: [
      {
        key: "organisation_1",
        label: "Organisations",
        isTitle: false,
        url: LINKS.dashbords.organisations,
      },
      {
        key: "personnes_1",
        label: "Personnes",
        isTitle: false,
        url: LINKS.dashbords.scouts,
      },
    ],
  },
  {
    key: "personnes",
    label: "Personnes",
    isTitle: false,
    icon: ICONS.personne,
    url: LINKS.personnes.base,
  },
  {
    key: "organisations",
    label: "Organisations",
    isTitle: false,
    icon: ICONS.organisation,
    url: LINKS.organisations.base,
  },
  {
    key: "message",
    label: "Messages",
    isTitle: false,
    icon: ICONS.message,
    url: LINKS.messages.base,
  },
  {
    key: "evenements",
    label: "Evenements",
    isTitle: false,
    icon: ICONS.events,
    url: LINKS.events.base,
  },
  { key: "params", label: "Parametres", isTitle: true },
  {
    key: "fonction",
    label: "Fonctions",
    isTitle: false,
    icon: ICONS.fonction,
    url: LINKS.fonctions.base,
  },

  {
    key: "types-unites",
    label: "Types d'unités",
    isTitle: false,
    icon: ICONS.type_unite,
    url: LINKS.types_unites.base,
  },
  {
    key: "ref-formation",
    label: "Réf. formations",
    isTitle: false,
    icon: ICONS.formation,
    url: LINKS.ref_formations.base,
  },
  {
    key: "instances",
    label: "Instances",
    isTitle: false,
    icon: ICONS.instance,
    url: LINKS.instances.base,
  },
];

export const getMenuItems = () => {
  // NOTE - You can fetch from server and return here as well
  return MENU_ITEMS;
};

export const findAllParent = (
  menuItems: MenuItemType[],
  menuItem: MenuItemType
): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem["parentKey"]);

  if (parent) {
    parents.push(parent["key"]);
    if (parent["parentKey"])
      parents = [...parents, ...findAllParent(menuItems, parent)];
  }

  return parents;
};

export const findMenuItem = (
  menuItems: MenuItemType[] | undefined,
  menuItemKey: MenuItemType["key"] | undefined
): MenuItemType | null => {
  if (menuItems && menuItemKey) {
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      const found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};
