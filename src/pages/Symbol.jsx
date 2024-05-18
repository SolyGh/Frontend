import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import { Link } from "react-router-dom";
import { Loading } from "../components/loading/Loading";

const Symbol = () => {
  const { company, stock, portfolio_id, stock_id } = useParams();
  const [earnings, setEarnings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStockData = async () => {
    setIsLoading(true);
    const res = await axios.get(`https://backend-production-ac54.up.railway.app/stocks/get-earnings/${stock_id}/${portfolio_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const stockData = [];
    const stock = res.data;
    for (const key in stock) {
      if (stock[key] === null) {
        continue;
      }
      if (Object.hasOwnProperty.call(stock, key)) {
        let element = stock[key];
        stockData.push({ [key]: element });
      }
    }
    setEarnings(stockData);
    setIsLoading(false);
  };
  useEffect(() => {
    getStockData();
  }, []);
  return (
    <div className="mt-5 flex flex-col gap-10">
      <div>
        <h3 className="text-2xl font-extrabold pl-3 capitalize">
          <Link to="/portfolio"> My Portfolios </Link> /{" "}
          <Link to={`/portfolio/${company}/${portfolio_id}`} className="text-blue-700">
            {company}
          </Link>{" "}
          / <span className="text-blue-800 uppercase">{stock}</span>
        </h3>
        <hr />
        <div className="border m-4 mt-12 p-12 " >
          {isLoading ? (
            <div className="w-full flex items-center justify-center h-screen">
                <Loading/>
            </div>
          ) : (
            <ul className="grid-stock my-3">
              {earnings.map((ele) => {
                console.log(ele);
                const key = Object.keys(ele);
                const val = ele[key];
                return (
                  <li key={ele.name}>
                    <span className="text-xl text-gray-800 capitalize">{key}</span>
                    <span className="font-semibold text-slate-900">{val}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Symbol;
