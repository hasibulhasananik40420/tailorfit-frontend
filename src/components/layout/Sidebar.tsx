/* eslint-disable react-hooks/exhaustive-deps */

import { NavLink, useLocation } from "react-router-dom";
import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { personPaths } from "../../routes/person.routes";
import { useEffect, useState } from "react";
import MobileSidebar from "./MobileSidebar";
import DashBoardLogo from "../ui/DashBoardLogo/DashBoardLogo";
import DashboardFooter from "../ui/DashBoardLogo/DashboardFooter";
import { TSidebarItem } from "../../types";
import NewOrderButton from "../NewOrderButton/NewOrderButton";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { SvgIcon } from "../../utils/SvgIcon";

const Sidebar = () => {
  const userRole = {
    SUPER_ADMIN: "super-admin",
    ADMIN: "admin",
  };

  // let sidebarItems;
  let sidebarItems: TSidebarItem[] = [];

  const user = useAppSelector(selectCurrentUser);
  //  console.log(user)

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(personPaths, userRole.ADMIN);
      break;
    // Add more cases if needed for other roles
    default:
      break;
  }

  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];
    const activeItem = personPaths.find((item) => item.path === currentPath);
    if (activeItem) {
      setActiveMenuItem(activeItem.name);
    } else {
      setActiveMenuItem(null);
    }
  }, [location.pathname, personPaths]);

  const handleMenuItemClick = (itemName: string) => {
    setActiveMenuItem(itemName);
    
  };

  return (
    <div className="relative">
      <div className="hidden 2xl:block lg:block 2xl:w-[320px] lg:w-[280px] px-5 pt-[30px] h-[100vh] bg-[#18010E] text-white  sticky top-0">
        <DashBoardLogo />

        <div className="mt-[30px] flex flex-col 2xl:gap-[30px] lg:gap-5">
          {user?.role === "admin" ? <NewOrderButton/> : null}

          {sidebarItems.map((item) =>
            item.label &&
            typeof item.label === "object" &&
            "props" in item.label &&
            "to" in item.label.props ? (
              <NavLink
                key={item.key}
                to={item.label.props.to}
                className={({ isActive }) =>
                  isActive
                //2xl:h-[50px] lg:h-[40px]
                    ? "bg-activeDhcolor  w-full h-[50px] rounded-[6px] pl-[15px] flex items-center gap-[15px]"
                    : "hover:bg-[#311E1E] duration-300 w-full h-[50px] rounded-[6px] pl-[15px] flex items-center gap-[15px]"
                }
                onClick={() => handleMenuItemClick(item.key)}
              >
                {item.children ? (
                  item.children.map((subItem) =>
                    subItem.label &&
                    typeof subItem.label === "object" &&
                    "props" in subItem.label &&
                    "to" in subItem.label.props ? (
                      <NavLink
                        key={subItem.key}
                        to={subItem.label.props.to}
                        className="pl-[15px]"
                      >
                        {subItem.label}
                      </NavLink>
                    ) : null
                  )
                ) : (
                  <>

                    <SvgIcon
                      className={`${
                        activeMenuItem === item.key
                          ? item?.icons?.active
                          : item?.icons?.inactive
                      } !w-6 !h-6`}
                      fill="none"
                      path={item?.icons?.path}
                    />
                    <h1
                      className={`${
                        activeMenuItem === item.key
                          ? "text-[#F00C89]"
                          : "text-white"
                      } 2xl:text-[18px] lg:text-[15px] font-medium font-Poppins leading-normal`}
                    >
                      {item.label.props.children}
                    </h1>
                  </>
                )}
              </NavLink>
            ) : null
          )}
        </div>

        <div className="absolute bottom-[30px]">
          <DashboardFooter />
        </div>
      </div>

      <div className="block lg:hidden 2xl:hidden">
        <MobileSidebar
          isOpen={false}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
