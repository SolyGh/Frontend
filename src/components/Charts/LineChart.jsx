// import React, { useEffect, useState } from "react";
import { LinePrimaryXAxis, LinePrimaryYAxis } from "../../data/dummy";
// import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from "@syncfusion/ej2-react-charts";

// import { useStateContext } from "../../contexts/ContextProvider";
// import axios from "axios";

// const LineChart = () => {
//   const { currentMode } = useStateContext();

//   const url = "http://asddf251.pythonanywhere.com/";
//   const [predictionData, setPredictionData] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const getPredictionData = async () => {
//     setLoading(true);
//     const res = await axios.get(url);
//     const stock = res.data.predictions.stocks["Apple"].predicted_prices_next_5_days;
//     setPredictionData(stock);
//     setLoading(false);
//     for (let i = 0; i < stock.length; i++) {
//       // Push an object with the date and corresponding value to the data array
//       setPredictionData(predictionData.push([{ x: new Date(tomorrow), y: stock[i] }]));

//       // Increment the date for the next iteration
//       tomorrow.setDate(tomorrow.getDate() + 1);
//     }
//     console.log(predictionData)
//   };

//   const lineCustomSeries = [
//     {
//       dataSource: predictionData,
//       xName: "Date",
//       yName: "Price",
//       name: "Stock",
//       width: "2",
//       marker: { visible: true, width: 10, height: 10 },
//       type: "Line",
//     },
//   ];
//   useEffect(() => {
//     getPredictionData();
//   }, []);
//   const today = new Date();

//   // Set the date to tomorrow
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   // Loop to generate data for tomorrow and the next days

//   return loading ? (
//     <p>loading</p>
//   ) : (
//     <ChartComponent
//       id="line-chart"
//       height="420px"
//       primaryXAxis={LinePrimaryXAxis}
//       primaryYAxis={LinePrimaryYAxis}
//       chartArea={{ border: { width: 0 } }}
//       tooltip={{ enable: true }}
//       background={currentMode === "Dark" ? "#33373E" : "#fff"}
//       legendSettings={{ background: "white" }}
//     >
//       <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />

//       <SeriesCollectionDirective>
//         {lineCustomSeries.map((item, index) => (
//           <SeriesDirective key={index} {...item} />
//         ))}
//       </SeriesCollectionDirective>
//     </ChartComponent>
//   );
// };

// export default LineChart;

import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from "@syncfusion/ej2-react-charts";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loading } from "../loading/Loading";

const LineChart = ({ stockName }) => {
  const { currentMode } = useStateContext();
  const url = "http://asddf251.pythonanywhere.com/";
  const [predictionData, setPredictionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPredictionData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        const _stockName = stockName === "aapl" ? "Apple" : stockName === "msft" ? "Microsoft" : "Google";
        const stock = res.data.predictions.stocks[_stockName].predicted_prices_next_5_days;
        const data = [];
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        for (let i = 0; i < stock.length; i++) {
          data.push({ x: new Date(tomorrow), y: stock[i] });
          tomorrow.setDate(tomorrow.getDate() + 1);
        }

        setPredictionData(data);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      } finally {
        setLoading(false);
        console.log(lineCustomSeries);
      }
    };

    getPredictionData();
  }, []);

  const lineCustomSeries = {
    dataSource: predictionData,
    xName: "x",
    yName: "y",
    name: stockName,
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  };

  return loading ? (
    <div className="w-100 flex justify-center items-center h-32">
      <Loading />
    </div>
  ) : (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective {...lineCustomSeries} />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
