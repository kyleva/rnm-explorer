import classnames from 'classnames';

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
      const isCurrentPage = currentPage === humanPageNumber;

      return (
        <button
          key={`pagination-${humanPageNumber}`}
          className={classnames('px-3 py-1 mx-2 border rounded', {
            'bg-gray-300': isCurrentPage,
          })}
          onClick={() => {
            if (isCurrentPage) return;

            setPage(humanPageNumber);
          }}
        >
          {humanPageNumber}
        </button>
      );
    })}
  </div>
);

export default Pagination;
