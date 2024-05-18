import React, { useState } from "react";
import Portfolios from "../components/Portfolios";
import PortfolioForm from "../components/PortfolioForm";

const Portfolio = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const handleCreatePortfolio = () => {
    setOpenPopup(!openPopup);
  };
  return (
    <div className="mt-5 flex flex-col gap-10">
      {openPopup && <PortfolioForm handleShowPopup={handleCreatePortfolio} />}

      <div>
        <h3 className="text-2xl font-extrabold pl-3">My Portfolios</h3>
        <hr />
        <Portfolios />
        <div className="text-center">
          <button className=" hover:bg-blue-400 hover:text-white text-black border font-bold py-2 px-4 mr-2 rounded-3xl" onClick={handleCreatePortfolio}>
            Create New Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
