import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { RootState } from "../store";
import useLogout from "../features/Auth/hooks/useLogout";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [logout] = useLogout();

  const options = [
    {
      name: "Profiles",
      icon: "fa-user",
      route: "profiles",
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
      route: "notes",
    },
    {
      name: "Armotizations",
      icon: "fa-rectangle-list",
      route: "armotizations",
    },
  ];

  return (
    <div className="side-navbar position-relative bg-white h-100 w-100 shadow-sm">
      <div className="container p-3 mb-3">
        <img className="img-fluid brand" src="/header.jpg" />
      </div>
      <div className="d-flex flex-column justify-content-center p-3">
        {options.map((option, key) => (
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "nav-link-active shadow-sm " : ""
              }nav-link mb-3 p-2 text-muted`
            }
            key={key}
            to={option.route}
          >
            <i className={`fa-regular ${option.icon} me-2`}></i>
            {option.name}
          </NavLink>
        ))}
      </div>
      <div className="d-flex flex-column justify-content-center position-absolute bottom-0 border-top p-3 w-100">
        <NavLink className={"nav-link p-2 text-muted mb-3"} to={"/login"}>
          <i className="fa-solid fa-user-tie me-2"></i>
          {user?.firstName} {user?.lastName}
        </NavLink>
        <NavLink
          className={"nav-link p-2 text-muted"}
          onClick={logout}
          to={"/login"}
        >
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
