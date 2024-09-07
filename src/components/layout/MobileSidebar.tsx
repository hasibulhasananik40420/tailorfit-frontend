/* eslint-disable react-hooks/exhaustive-deps */
import { IoCloseOutline } from "react-icons/io5";
import DashBoardLogo from "../ui/DashBoardLogo/DashBoardLogo";
import DashboardFooter from "../ui/DashBoardLogo/DashboardFooter";
import { TSidebarItem } from "../../types";
import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { personPaths } from "../../routes/person.routes";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import SwitchLanguage from "../ReuseForm/SwitchLanguage";
import { SvgIcon } from "../../utils/SvgIcon";
import NewOrderButtonForMobile from "../NewOrderButton/NewOrderButtonForMobile";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const userRole = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
  };

  // let sidebarItems;
  let sidebarItems: TSidebarItem[] = [];

  const user = useAppSelector(selectCurrentUser);

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
    onClose();
  };

  // Ref for the sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);


  

  return (
    <div className="">
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-[252px] md:w-[320px] z-50 bg-[#18010E] p-4 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-5 mb-[30px]">
          <DashBoardLogo />
          <IoCloseOutline
            onClick={onClose}
            className="size-6 text-white absolute right-3"
          />
        </div>

        <div className="flex flex-col gap-5">
          {user?.role === "admin" ? <NewOrderButtonForMobile onClose={onClose} /> : null}

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
                    ? "bg-activeDhcolor  w-full h-[40px] rounded-[6px] pl-[10px] flex items-center gap-[15px]"
                    : "hover:bg-[#311E1E] w-full h-[40px] rounded-[6px] pl-[10px] flex items-center gap-[15px] hover:bg-fillColor duration-300"
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
                        className="pl-[10px]"
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
                      } !w-5 !h-5`}
                      fill="none"
                      path={item?.icons?.path}
                    />
                    <h1
                      className={`${
                        activeMenuItem === item.key
                          ? "text-[#F00C89]"
                          : "text-white"
                      } text-[14px] font-medium font-Poppins leading-normal`}
                    >
                      {item.label.props.children}
                    </h1>
                  </>
                )}
              </NavLink>
            ) : null
          )}
        </div>

        <div className="pl-[20px] absolute bottom-[80px]">
          <SwitchLanguage />
        </div>
        <div className="absolute bottom-[16px]">
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
