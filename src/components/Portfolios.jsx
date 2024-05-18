import React, { useState } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, CommandColumn } from "@syncfusion/ej2-react-grids";
import { portfoliosGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Loading } from "./loading/Loading";

const Portfolios = () => {
  const toolbarOptions = ["Search"];
  const { portfolios, getPortfolios, token, loadingPortfolios } = useStateContext();
  console.log(portfolios);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = async (args) => {
    const portfolioId = args.portfolio_id; // Access portfolio_id from rowData
    setIsDeleting(true);
    try {
      const response = await axios.delete(`https://backend-production-ac54.up.railway.app/portfolio/${portfolioId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setIsDeleting(false);
      getPortfolios();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  };

  return loadingPortfolios ? (
    <div className="w-full h-32 flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <GridComponent dataSource={portfolios} width="auto" allowPaging allowSorting pageSettings={{ pageCount: 5 }} toolbar={toolbarOptions}>
        <ColumnsDirective>
          <ColumnDirective
            field={portfoliosGrid[0].field}
            headerText={portfoliosGrid[0].headerText}
            width={portfoliosGrid[0].width}
            template={(props) => (
              <div style={{ color: "blue", cursor: "pointer" }}>
                <Link to={`/portfolio/${props.portfolio_name}/${props.portfolio_id}`}>{props[portfoliosGrid[0].field]}</Link>
              </div>
            )}
          />
          {portfoliosGrid.slice(1).map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}

          <ColumnDirective
            headerText={"Actions"}
            width="100"
            template={(props) =>
              isDeleting ? (
                <span>Loading..</span>
              ) : (
                <button onClick={() => deleteHandler(props)}>
                  <RiDeleteBin6Line />
                </button>
              )
            }
          />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar, CommandColumn]} />
      </GridComponent>
    </div>
  );
};

export default Portfolios;
