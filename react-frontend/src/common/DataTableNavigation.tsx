interface DataTableNavigationProps {
  setPage: (...args: any[]) => void;
  page: number;
}

const DataTableNavigation = ({ setPage, page }: DataTableNavigationProps) => {
  const toPrevious = () => {
    setPage((prev: number) => {
      if (prev - 1 < 0) return 0;
      return prev - 1;
    });
  };

  const toNext = () => {
    setPage((prev: number) => prev + 1);
  };

  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-accent col-lg-2 me-5"
        onClick={toPrevious}
        disabled={page - 1 === 0}
      >
        Previous
      </button>
      <button className="btn btn-accent col-lg-2" onClick={toNext}>
        Next
      </button>
    </div>
  );
};

export default DataTableNavigation;
