interface FinancialCardProps {
  title?: string;
  heading: string | number;
  subheading: string;
  headers: (string | number)[][];
  className?: string;
}

const FinancialCard = ({
  title = "",
  heading = "",
  headers,
  subheading = "",
  className = "",
}: FinancialCardProps) => {
  return (
    <div className={`border rounded-3 shadow-sm ${className}`}>
      {/* Top title */}
      {title && <div className="p-3 border-bottom">{title}</div>}
      {/* Body */}
      <div className={`row mx-0 p-3`}>
        {/* First column */}
        <div className="col-lg-6 flex flex-col justify-center">
          <h6 className="text-center">{subheading}</h6>
          {/* Big heading */}
          <h1 className="text-center text-7xl">{heading}</h1>
        </div>
        {/* Second column */}
        <div className="col-lg-6 flex flex-col flex-wrap gap-3">
          {/* Headers */}
          {headers.map((header, key) => (
            <div key={key} className="border-bottom flex justify-between">
              <span>{header[0]}</span>
              <b>{header[1]}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
