import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  HiloSeries,
  Tooltip,
  DateTime,
  Zoom,
  Logarithmic,
  Crosshair,
  HiloOpenCloseSeries,
  AxesDirective,
  AxisDirective,
  ColumnSeries,
} from "@syncfusion/ej2-react-charts";

import { FinancialPrimaryXAxis, FinancialPrimaryYAxis } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { ChartsHeader, LineChart } from "../../components";

// const date1 = new Date("2024, 5, 5");

// function filterValue(value) {
//   if (value.x >= date1) {
//     return value.x, value.high, value.low;
//   }
// }

const Financial = ({ stock, stockName }) => {
  // const returnValue = financialChartData.filter(filterValue);
  const { currentMode } = useStateContext();
  const stockData = [];
  for (const key in stock) {
    if (key === "historicalData" || stock[key] === null) {
      continue;
    }
    if (Object.hasOwnProperty.call(stock, key)) {
      let element = stock[key];
      if (typeof stock[key] === "string" && stock[key].startsWith("+")) {
        let date = new Date(stock[key]);
        element = date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });
      }
      stockData.push({ [key]: element });
    }
  }

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      {/* <ChartsHeader category="Financial" title="AAPLE Historical" /> */}
      <div className=" mb-10">
        <div>
          <p className="text-sm text-gray-400">NasdaqGS - Nasdaq Real Time Price • USD</p>
          <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900 pb-2">{stock.name}</p>
          <hr />
          <p className="text-4xl dark:text-gray-200 text-slate-900">{stock.price}</p>
        </div>
        <p className="text-center dark:text-gray-200 text-xl mb-2 mt-3">{stock.symbol}</p>
      </div>
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={{
            valueType: "DateTime",
            labelFormat: "dd-MMM-yyyy", // Format the date as "day - month - year"
            ...FinancialPrimaryXAxis,
          }}
          // primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          crosshair={{ enable: true, lineType: "Vertical", line: { width: 0 } }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        >
          <Inject services={[HiloOpenCloseSeries, ColumnSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={stock.historicalData}
              xName="x"
              low="low"
              high="high"
              open="open"
              close="close"
              name="Apple Inc"
              type="HiloOpenClose"
            />
            <SeriesDirective dataSource={stock.historicalData} xName="x" yName="volume" name="Volume" type="Column" yAxisName="volume" />
          </SeriesCollectionDirective>
          <AxesDirective>
            <AxisDirective name="volume" opposedPosition={true} title="Volume"></AxisDirective>
          </AxesDirective>
        </ChartComponent>
      </div>

      <ul className="grid-list my-3">
        {stockData.map((ele) => {
          const key = Object.keys(ele);
          const val = ele[key];
          return (
            <li key={ele.name}>
              <span className="text-sm text-gray-600 capitalize">{key}</span>
              <span className="text-slate-900 font-medium">{val}</span>
            </li>
          );
        })}
      </ul>
      <hr />
      {stockName === "aapl" || stockName === "msft" || stockName === "googl" ? (
        <div className="mt-8">
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900 pb-2">Prediction</h2>
          <LineChart stockName={stockName} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Financial;
