import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";

// make a component of Button in nav so if i can use it
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span style={{ background: dotColor }} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
      {icon}
    </button>
  </TooltipComponent>
);

//Navbar
const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor } =
    useStateContext();

  // to get the width of any entire Screen
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    // you should remove eventListener after you get your information
    return () => window.removeEventListener("resize", handleResize);
    //i need to make it initially when the site is open and not [screenSize] because it will be done every time screen change
  }, []);

  // after i know the width please check it and don't open Menu in small screens
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    // of course the change will be in every screenSize
  }, [screenSize]);

  //
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      {/* ---------- Menu button --------- */}
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevStatus) => setActiveMenu(!prevStatus))}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
    </div>
  );
};

export default Navbar;
