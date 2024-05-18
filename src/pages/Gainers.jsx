import React from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from "@syncfusion/ej2-react-grids";

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

const Gainers = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const { stocks } = useStateContext();
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="" title="Stocks" />

      <GridComponent dataSource={stocks} width="auto" allowPaging allowSorting pageSettings={{ pageCount: 5 }} editSettings={editing} toolbar={toolbarOptions}>
        <ColumnsDirective>
          <ColumnDirective
            field={employeesGrid[0].field}
            headerText={employeesGrid[0].headerText}
            width={employeesGrid[0].width}
            template={(props) => (
              <div style={{ color: "blue", cursor: "pointer" }}>
                <Link to={`/stocks/${props[employeesGrid[0].field].toLowerCase()}`}>{props[employeesGrid[0].field]}</Link>
              </div>
            )}
          />
          {employeesGrid.slice(1).map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Gainers;
