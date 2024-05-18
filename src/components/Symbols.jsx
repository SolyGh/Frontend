import React, { useState } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, CommandColumn } from "@syncfusion/ej2-react-grids";
import { symbolsGrid } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios"; // Import Axios
import { Link, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Loading } from "./loading/Loading";

const Symbols = ({ symbols, getSymbols }) => {
  const toolbarOptions = ["Search"];
  const { token } = useStateContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const {company} =useParams()


  const deleteHandler = async (args) => {
    setIsDeleting(true);
    const portfolioId = args.portfolio_id;
    const stockId = args.stock_id; // Access portfolio_id from rowData
    try {
      const response = await axios.delete(`https://backend-production-ac54.up.railway.app/stocks/${stockId}/${portfolioId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setIsDeleting(false);
      getSymbols();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <GridComponent dataSource={symbols} width="auto" allowPaging allowSorting pageSettings={{ pageCount: 5 }} toolbar={toolbarOptions}>
        <ColumnsDirective>
          <ColumnDirective
            field={symbolsGrid[0].field}
            headerText={symbolsGrid[0].headerText}
            width={symbolsGrid[0].width}
            template={(props) => (
              <div style={{ color: "blue", cursor: "pointer" }}>
                <Link to={`/portfolio/${company}/${props.portfolio_id}/${props.company_name.toLowerCase()}/${props.stock_id}`}>{props[symbolsGrid[0].field]}</Link>
              </div>
            )}
          />
          {symbolsGrid.slice(1).map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
          {isDeleting ? (
            <ColumnDirective headerText="Actions" width="100" template={() => <Loading height={15} width={15}></Loading>} />
          ) : (
            <ColumnDirective
              headerText={"Actions"}
              width="100"
              template={(props) => (
                <button onClick={() => deleteHandler(props)}>
                  <RiDeleteBin6Line />
                </button>
              )}
            />
          )}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar, CommandColumn]} />
      </GridComponent>
    </div>
  );
};

export default Symbols;
