import React, { useEffect, useRef, useState } from "react";
import Portfolios from "../components/Portfolios";
import axios, { all } from "axios";
import { useParams } from "react-router";
import { useStateContext } from "../contexts/ContextProvider";
import { GiCancel } from "react-icons/gi";
import Symbols from "../components/Symbols";
import { Link } from "react-router-dom";
import { Loading } from "../components/loading/Loading";

const View = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [loadingSymbols, setLoadingSymbols] = useState(false);

  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [symbolsPortfolio, setSymbolsPortfolio] = useState([]);
  const [companies, setCompanies] = useState([]);
  const { stocks } = useStateContext();
  // const [portfolio, setPortfolio] = useState({});
  const { id, company } = useParams();
  const [loading, setLoading] = useState(false);

  // const getPortfolio = async () => {
  //   const res = await axios.get(`https://backend-production-ac54.up.railway.app/portfolio/${id}`, {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });
  //   setPortfolio(res.data.portfolio);
  // };
  const handleEnterSymbol = (e) => {
    const value = e.target.value;
    setSymbol(value);
    const allSymbols = stocks.filter((ele) => ele.symbol.toLowerCase().includes(value.toLowerCase()));
    setCompanies(allSymbols);
    setOpenPopup2(true);
  };
  const handleEnterShares = (e) => {
    const enteredShares = parseInt(e.target.value);
    if (!isNaN(enteredShares) && enteredShares > 0) {
      setShares(enteredShares);
    }
  };
  const addSymbolToPortfolio = async (e) => {
    e.preventDefault();
    setLoading(true);
    const values = {
      company_name: symbol,
      shares: shares,
    };
    const res = await axios.post(`https://backend-production-ac54.up.railway.app/stocks/create-stock/${id}`, values, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setShares("");
    setSymbol("");
    setLoading(false);
    getSymbolsOfPortfolio();
  };

  const getSymbolsOfPortfolio = async () => {
    setOpenPopup(false);
    setLoadingSymbols(true);
    const res = await axios.get(`https://backend-production-ac54.up.railway.app/stocks/read-all-stocks/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(res.data);
    setSymbolsPortfolio(res.data);
    setLoadingSymbols(false);
  };

  useEffect(() => {
    // getPortfolio();
    getSymbolsOfPortfolio();
  }, []);
  return (
    <div className="mt-5 flex flex-col gap-10">
      <div>
        <h3 className="text-2xl font-extrabold pl-3">
          <Link to="/portfolio"> My Portfolios </Link>/<span className="text-blue-700">{company}</span>
        </h3>
        <hr />
        <div className="border m-4 mt-12 p-12 relative">
          <h4 className="text-2xl font-semibold mb-12">My Holdings</h4>
          <div className="relative w-3/4">
            <button
              className="text-blue-800 hover:bg-blue-400 hover:text-white  border font-bold py-2 px-4 mr-2 rounded-3xl"
              onClick={() => {
                setOpenPopup(true);
              }}
            >
              + Add Symbol
            </button>
            {openPopup && (
              <div className="absolute left-0 bottom--50  bg-white border shadow p-4 z-50">
                <div className="w-6 h-6 bg-white absolute top-0 left-20 rotate-45 border-t border-l border-gray-300"></div>
                <div className="text-gray-800 relative w-full">
                  <span className="absolute right-0" style={{ top: "-30px" }}>
                    <GiCancel
                      cursor={"pointer"}
                      fontSize={"20px"}
                      onClick={() => {
                        setOpenPopup(false);
                        setOpenPopup2(false);
                        setSymbol("");
                        setShares("");
                      }}
                    />
                  </span>
                  <form onSubmit={addSymbolToPortfolio} className="flex flex-col items-start mt-5 gap-2">
                    <label htmlFor="symbol">Enter symbol or company name</label>
                    <input
                      id="symbol"
                      type="text"
                      placeholder="AAPL, TSLA, MSFT "
                      className="p-1 rounded mb-1 border border-gray-300 focus:outline-none focus:border-blue-500"
                      value={symbol}
                      onChange={handleEnterSymbol}
                      required
                      autoComplete="false"
                    />
                    <label htmlFor="shares">Enter number of shares</label>

                    <input
                      id="shares"
                      type="number"
                      placeholder="Enter number of shares"
                      className="p-1 rounded mb-1 border border-gray-300 focus:outline-none focus:border-blue-500"
                      value={shares}
                      onChange={handleEnterShares}
                      required
                      autoComplete="false"
                    />
                    <button type="submit" className="border rounded p-2 hover:text-blue-800">
                      {loading ? "Loading.." : "Submit"}
                    </button>
                  </form>
                  {openPopup2 && (
                    <div className="absolute left-0 bg-white border shadow p-4 z-50" style={{ top: "65px" }}>
                      <ul className="flex flex-col gap-2">
                        {companies.length <= 0 ? (
                          <li>NO symbol or Compony has same name</li>
                        ) : (
                          companies.slice(0, 5).map((compony) => (
                            <li
                              className="flex gap-3 overflow-hidden overflow-ellipsis whitespace-nowrap cursor-pointer"
                              onClick={() => {
                                setSymbol(compony.symbol);
                                setOpenPopup2(false);
                              }}
                            >
                              <span className="text-blue-400">{compony.symbol}</span>
                              <span>{compony.name}</span>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {loadingSymbols ? (
          <div className="w-100 flex justify-center items-center h-32">
            <Loading />
          </div>
        ) : (
          <div className="z-20">
            <Symbols symbols={symbolsPortfolio} getSymbols={getSymbolsOfPortfolio} />
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
