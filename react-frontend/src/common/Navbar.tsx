import { NavLink } from "react-router";

const Navbar = () => {
  const options = [
    {
      name: "Clients",
      icon: "fa-user",
      route: "clients",
    },
    {
      name: "Loan Officers",
      icon: "fa-user",
      route: "loan-officers",
    },
    {
      name: "Admins",
      icon: "fa-user",
      route: "admins",
    },
    {
      name: "Collaterals",
      icon: "fa-folder-open",
      route: "collaterals",
    },
    {
      name: "Transactions",
      icon: "fa-credit-card",
      route: "transactions",
    },
    {
      name: "Loans",
      icon: "fa-envelope",
      route: "loans",
    },
    {
      name: "Adjustment Notes",
      icon: "fa-clipboard",
      route: "adjusment-notes",
    },
    {
      name: "Armotizations",
      icon: "fa-rectangle-list",
      route: "armotizations",
    },
  ];

  return (
    <div className="bg-white h-100 w-100 p-3 shadow-sm">
      <div className="container mb-3">
        <img className="img-fluid brand" src="/header.jpg" />
      </div>
      <div className="mt-3">
        <input className="form-control" type="search" />
      </div>
      <div className="d-flex flex-column justify-content-center">
        {options.map((option, key) => (
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "nav-link-active " : ""}nav-link mt-4 p-2 rounded-3`
            }
            key={key}
            to={option.route}
          >
            <i className={`fa-regular ${option.icon} me-2`}></i>
            {option.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
