import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initialState = {
  cart: false,
  userProfile: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [news, setNews] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [loadingNews, setLoadingNews] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchNews = async (page) => {
    try {
      setLoadingNews(true);
      const newsRes = await axios.get(
        `https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&page=${
          page || 1
        }&filter_entities=true&language=en&api_token=gYiwQNXuHJa6ijweq3wj1J1EPph3qMZTqFnWznYy`
      );
      setLoadingNews(false);
      setTotalNews(newsRes.data.meta.found > 100 ? 100 : newsRes.data.meta.found);
      setNews(newsRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    //don't forget to add it to the localStorage so when he refresh the page it will still the choice which he choose
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    // our clicked is an object because it contain alot of buttons so spreed all of the object then make it true
    setIsClicked({ ...initialState, [clicked]: true });

  const logout = () => {
    setIsLoggedIn(false); // Sets isLoggedIn to false
  };

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        news,
        totalNews,
        fetchNews,
        loadingNews,
        isLoggedIn,
        setIsLoggedIn,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
