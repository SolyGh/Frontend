import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoIosLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { SiPivotaltracker } from "react-icons/si";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor, isLoggedIn, setIsLoggedIn, setAllTokens } = useStateContext();

  //to close menu automatically when you click on any link
  //only if you less than 900
  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const handleLogout = () => {
    handleCloseSideBar();
    setIsLoggedIn(false);
    setAllTokens("");
  };
  const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          {/* shoppy logo and cancel button */}
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/"
              onClick={() => handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extralight tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>PFMS</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                type="button"
                onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          {isLoggedIn ? (
            <>
              <NavLink
                to="login"
                onClick={handleLogout}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  background: isActive ? currentColor : "",
                })}
              >
                <IoIosLogIn />
                <span className="capitalize">Logout</span>
              </NavLink>

              <NavLink
                to="user-info"
                onClick={handleCloseSideBar}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  background: isActive ? currentColor : "",
                })}
              >
                <FaRegUserCircle />
                <span className="capitalize">User Information</span>
              </NavLink>

              <NavLink
                to="portfolio"
                onClick={handleCloseSideBar}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  background: isActive ? currentColor : "",
                })}
              >
                <SiPivotaltracker />
                <span className="capitalize">Portfolio</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="sign-up"
                onClick={handleCloseSideBar}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  background: isActive ? currentColor : "",
                })}
              >
                <SiGnuprivacyguard />
                <span className="capitalize">Sign Up</span>
              </NavLink>
              <NavLink
                to="login"
                onClick={handleCloseSideBar}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  background: isActive ? currentColor : "",
                })}
              >
                <IoIosLogIn />
                <span className="capitalize">Login</span>
              </NavLink>
            </>
          )}
          <div>
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.to}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    style={({ isActive }) => ({
                      background: isActive ? currentColor : "",
                    })}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
