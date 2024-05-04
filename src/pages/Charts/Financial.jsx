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

import { financialChartData, FinancialPrimaryXAxis, FinancialPrimaryYAxis } from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
import { ChartsHeader } from "../../components";

const date1 = new Date("2017, 1, 1");

function filterValue(value) {
  if (value.x >= date1) {
    return value.x, value.high, value.low;
  }
}
const returnValue = financialChartData.filter(filterValue);

const Financial = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Financial" title="AAPLE Historical" />
      <div className="w-full">
        {/* <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          crosshair={{ enable: true, lineType: "Vertical", line: { width: 0 } }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        >
          <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={returnValue}
              xName="x"
              yName="low"
              name="Apple Inc"
              type="Hilo"
              low="low"
              high="high"
              close="close"
              volume="volume"
            />
          </SeriesCollectionDirective>
        </ChartComponent> */}

        {/* second with low high close */}
        {/* <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          crosshair={{ enable: true, lineType: "Vertical", line: { width: 0 } }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        >
          <Inject services={[HiloOpenCloseSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={returnValue}
              xName="x"
              low="low"
              high="high"
              open="open"
              close="close"
              volume="volume"
              name="Apple Inc"
              type="HiloOpenClose"
            />
          </SeriesCollectionDirective>
        </ChartComponent> */}

        {/* third */}

        <ChartComponent
          id="charts"
          primaryXAxis={{
            valueType: 'DateTime',
            labelFormat: 'dd-MMM-yyyy', // Format the date as "day - month - year"
            ...FinancialPrimaryXAxis
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
            <SeriesDirective dataSource={returnValue} xName="x" low="low" high="high" open="open" close="close" name="Apple Inc" type="HiloOpenClose" />
            <SeriesDirective dataSource={returnValue} xName="x" yName="volume" name="Volume" type="Column" yAxisName="volume" />
          </SeriesCollectionDirective>
          <AxesDirective>
            <AxisDirective name="volume" opposedPosition={true} title="Volume"></AxisDirective>
          </AxesDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Financial;
