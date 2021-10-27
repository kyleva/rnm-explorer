type PaginationProps = {
  currentPage: number;
  pageCount: number;
  setPage: (pageNumber: number) => void;
};

const Pagination = ({ currentPage, pageCount, setPage }: PaginationProps) => (
  <div className="text-center">
    {Array.from(Array(pageCount)).map((p, i) => {
      /**
       * Get human readable page number (starts at 1)
       */
      const humanPageNumber = i + 1;
      /**
       * Honestly I don't like the ternary below for readability reasons
       * but it isn't that necessary to refactor!
       */
      const pageItem =
        currentPage === humanPageNumber ? (
          <button
            key={`pagination-${humanPageNumber}`}
            className="px-3 py-1 mx-2 bg-gray-300 border rounded"
          >
            {humanPageNumber}
          </button>
        ) : (
          <button
            key={`pagination-${humanPageNumber}`}
            className="px-3 py-1 mx-2 border rounded"
            onClick={() => {
              setPage(humanPageNumber);
            }}
          >
            {humanPageNumber}
          </button>
        );

      return pageItem;
    })}
  </div>
);

export default Pagination;
