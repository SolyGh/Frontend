import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useParams } from "react-router";
import Financial from "./Charts/Financial";
import { financialChartData } from "../data/dummy";
import { Loading } from "../components/loading/Loading";

const Stock = () => {
  const [loading, setLoading] = useState(true);
  const { stockName } = useParams();
  const { token } = useStateContext();
  const [stock, setStock] = useState();
  const getStocks = async () => {
    const res = await axios.get(`https://backend-production-ac54.up.railway.app/stocks?search=${stockName}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setStock(res.data);
    console.log(res.data.data.historicalData);
    setLoading(false);
  };
  useEffect(() => {
    getStocks();
  }, []);
  return loading ? (
    <div className="flex justify-center items-center" style={{ height: "100vh" }}>
      <Loading />
    </div>
  ) : (
    <Financial stockName={stockName} stock={stock.data} />
  );
};

export default Stock;
