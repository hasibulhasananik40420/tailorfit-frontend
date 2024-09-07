// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NavLink } from "react-router-dom";
// import { TSidebarItem, TUserPath } from "../types";

// type TItem = {
//   path: string;
//   name: string;
//   icons: {
//     active: string;
//     inactive: string;
//     path: string;
//   };

//   children: any;
// };

// export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
//   const sidebarItems = items.reduce((acc: TSidebarItem[], item: TItem) => {
//     if (item.path && item.name) {
//       console.log(item);
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
//         icons: item.icons,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
//           icons: child.icons,
//         })),
//       });
//     }

//     return acc;
//   }, []);

//   return sidebarItems;
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { TSidebarItem } from "../types";

type TChildItem = {
  path: string;
  name: string;
  icons: {
    active: string;
    inactive: string;
    path: string;
  };
};

type TItem = {
  path: string;
  name: string;
  icons: {
    active: string;
    inactive: string;
    path: string;
  };
  children?: TChildItem[];
};

export const sidebarItemsGenerator = (
  items: TItem[],
  role: string
): TSidebarItem[] => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item: TItem) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        icons: item.icons,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
          icons: child.icons,
        })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
