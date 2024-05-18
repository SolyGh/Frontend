import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "./contexts/ContextProvider";
import { Navbar, Sidebar, ThemeSettings } from "./components";
import {
  Main,
  MostActives,
  Gainers,
  Stock,
  Stacked,
  Pyramid,
  Losers,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  SignUp,
  Login,
  UserInformation,
  Portfolio,
} from "./pages";
import "./App.css";
import View from "./pages/View";
import Symbol from "./pages/Symbol";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    setAllTokens,
    setIsLoggedIn,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      setAllTokens(token);
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg ">
          <div className="fixed right-4 bottom-4  " style={{ zIndex: "1000" }}>
            <TooltipComponent content="setting" position="top">
              <button
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: currentColor, borderRadius: "50%" }}
                onClick={() => setThemeSettings(true)}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {activeMenu ? (
            // sidebar will make it above the navbar if you don't write it ,it will be below the nav
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen  w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}>
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg  navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/news" element={<Main />} />


                <Route path="/most-actives" element={<MostActives />} />
                <Route path="/stocks" element={<Gainers />} />
                <Route path="/stocks/:stockName" element={<Stock />} />

                <Route path="/losers" element={<Losers />} />

                <Route path="/Sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user-info" element={<UserInformation />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:company/:id" element={<View />} />
                <Route path="/portfolio/:company/:portfolio_id/:stock/:stock_id" element={<Symbol />} />



                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
