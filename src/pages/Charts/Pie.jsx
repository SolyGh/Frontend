import React, { useState } from "react";
import { ChartsHeader, Pie as PieChart } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const Pie = () => {
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
  const { currentColor } = useStateContext();

  const generatePieChartData = (company) => {
    const data = newAnalysisLastWeek[company];
    return [
      { x: "positive", y: data.positive, text: `${data.positive} positive` },
      { x: "negative", y: data.negative, text: `${data.negative} negative` },
      { x: "neutral", y: data.neutral, text: `${data.neutral} neutral` },
    ];
  };

  const pieChartData = generatePieChartData(selectedCompany);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="" title="News Analysis Last Week" />

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
        <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" company={selectedCompany}/>
      </div>
    </div>
  );
};

export default Pie;
