import React, { useState } from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  AccumulationDataLabel,
  AccumulationTooltip,
  PyramidSeries,
  AccumulationSelection,
} from "@syncfusion/ej2-react-charts";
import { useStateContext } from "../../contexts/ContextProvider";
import { ChartsHeader } from "../../components";

const Pyramid = () => {
  const newAnalysisLastWeek = {
    Apple: {
      positive: 5,
      negative: 8,
      neutral: 12,
    },
    Google: {
      positive: 10,
      negative: 3,
      neutral: 7,
    },
    Microsoft: {
      positive: 7,
      negative: 4,
      neutral: 9,
    },
  };

  const [selectedCompany, setSelectedCompany] = useState("Apple");
  const { currentMode, currentColor } = useStateContext();

  const generatePyramidData = (company) => {
    const data = newAnalysisLastWeek[company];
    return [
      { x: "positive", y: data.positive, text: `${data.positive} positive` },
      { x: "negative", y: data.negative, text: `${data.negative} negative` },
      { x: "neutral", y: data.neutral, text: `${data.neutral} neutral` },
    ];
  };

  const pyramidData = generatePyramidData(selectedCompany);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Pyramid" title="New Analysis Last Week" />

      <div className="flex justify-center mb-4">
        {Object.keys(newAnalysisLastWeek).map((company) => (
          <button
            key={company}
            className={`mx-2 px-4 py-2 rounded-lg bg-gray-200`}
            style={{ background: selectedCompany === company ? currentColor : "" }}
            onClick={() => setSelectedCompany(company)}
          >
            {company}
          </button>
        ))}
      </div>

      <div className="w-full">
        <AccumulationChartComponent
          id="pyramid-chart"
          legendSettings={{ background: "white" }}
          tooltip={{ enable: true }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        >
          <Inject
            services={[
              AccumulationDataLabel,
              AccumulationTooltip,
              PyramidSeries,
              AccumulationLegend,
              AccumulationSelection,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              name="Sentiment"
              dataSource={pyramidData}
              xName="x"
              yName="y"
              type="Pyramid"
              width="45%"
              height="80%"
              neckWidth="15%"
              gapRatio={0.03}
              explode
              emptyPointSettings={{ mode: "Drop", fill: "red" }}
              dataLabel={{
                visible: true,
                position: "Inside",
                name: "text",
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default Pyramid;
