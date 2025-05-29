// import { MenuItemType } from "../appConstants";
import * as Icon from "react-bootstrap-icons";

import { LINKS } from "./links";
import { UserDroit } from "./droits";
import { UserResource } from "types/auth.type";
import { NATURE, TYPE_ORGANISATION } from "./constants";

const MON_PROFIL = {
  code: "profil",
  label: "Mon profil",
  url: LINKS.profil.base,
  Icon: Icon.PersonBadge,
};

const MON_ORGANISATION = {
  code: "organisation",
  label: "Mon organisation",
  url: LINKS.organisation.base,
  Icon: Icon.FilterSquare,
};

export const MES_INFORMATIONS = [MON_PROFIL, MON_ORGANISATION];

export const MENU = [
  {
    code: "personnes",
    label: "Personnes",
    Icon: Icon.PeopleFill,
    url: LINKS.personnes.base,
  },
  {
    code: "organisations",
    label: "Organisations",
    Icon: Icon.Building,
    url: LINKS.organisations.base,
  },
  {
    code: "paiements",
    label: "Paiements",
    Icon: Icon.CurrencyDollar,
    url: LINKS.paiements.base,
  },
  {
    code: "mails",
    label: "Mails",
    Icon: Icon.SendFill,
    url: LINKS.messages.base,
  },
];
// export const MENU_ITEMS = ;

const getLibelleOrganisation = (nature: string, type?: string) => {
  switch (nature) {
    case NATURE.unite:
      return "Mon unité";
    case NATURE.groupe:
      return "Mon groupe";
    case NATURE.region:
      return "Ma région";
    case NATURE.national:
      return type === TYPE_ORGANISATION.equipe_nationale
        ? "Eq. Nationale"
        : "Co. National";

    default:
      break;
  }
};

export const getMenuItems = (
  userDroit: UserDroit,
  user?: UserResource | null
) => {
  const menu = MENU.filter((menu) => userDroit.hasMenu(menu.code));

  if (user?.personne?.organisation) {
    const nature = user?.personne?.organisation.nature.code;
    const type = user?.personne?.organisation.type?.code;

    const result = [
      // MON_PROFIL,
      { ...MON_ORGANISATION, label: getLibelleOrganisation(nature, type) },
      ...menu,
    ];
    if (
      userDroit.perimetres.length === 1 &&
      userDroit.perimetres.includes("unite")
    ) {
      return result.filter((r) => r.code !== "organisations");
    }
    return result;
  }
  return MENU.filter((menu) => userDroit.hasMenu(menu.code));
};

// export const findAllParent = (menuItems: any[], menuItem: any): string[] => {
//   let parents: string[] = [];
//   const parent = findMenuItem(menuItems, menuItem["parentKey"]);

//   if (parent) {
//     parents.push(parent["key"]);
//     if (parent["parentKey"])
//       parents = [...parents, ...findAllParent(menuItems, parent)];
//   }

//   return parents;
// };

// export const findMenuItem = (
//   menuItems: any[] | undefined,
//   menuItemKey: any["key"] | undefined
// ): any | null => {
//   if (menuItems && menuItemKey) {
//     for (let i = 0; i < menuItems.length; i++) {
//       if (menuItems[i].key === menuItemKey) {
//         return menuItems[i];
//       }
//       const found = findMenuItem(menuItems[i].children, menuItemKey);
//       if (found) return found;
//     }
//   }
//   return null;
// };
