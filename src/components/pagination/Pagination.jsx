import { useState } from "react";
import './pagination.css'
import { useStateContext } from "../../contexts/ContextProvider";
const Pagination = () => {
    const {fetchNews , totalNews} = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;
  const lastPage = Math.ceil(totalNews / ITEMS_PER_PAGE);
  const goToPage = (page) => {
    setCurrentPage(page);
    fetchNews(page);
  };
  return (
    <section className="pagination my-4">
      {/* prev button */}
      {currentPage > 1 && <button onClick={() => goToPage(currentPage - 1)}>&lt;</button>}

      {/*  first page */}
      {currentPage > 10 && <button onClick={() => goToPage(1)}>1</button>}

      {currentPage > 10 && <button>..</button>}



      {/* prev page */}
      {currentPage > 1 && <button onClick={() => goToPage(currentPage - 1)}>{currentPage - 1}</button>}

      {/* current page */}

      <button className="active">{currentPage}</button>

      {/* next page */}

      {currentPage * ITEMS_PER_PAGE < totalNews && <button onClick={() => goToPage(currentPage + 1)}>{currentPage + 1}</button>}

      {/* ... button */}
      {currentPage < lastPage - 3 && <button>..</button>}

      {/* last page */}
      {currentPage < lastPage - 3 && <button onClick={() => goToPage(lastPage)}>{lastPage}</button>}

      {/* next button */}

      {currentPage < lastPage - 1 && <button onClick={() => goToPage(currentPage + 1)}>&gt;</button>}
    </section>
  );
};

export default Pagination;
