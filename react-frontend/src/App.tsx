import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Login from "./pages/Login/Login";
import { Provider } from "react-redux";
import store from "./store";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./common/ProtectedRoute";
import Index from "./pages/Index/Index";
import LoansPage from "./components/Loans/pages/LoansPage";
import CollateralsPage from "./components/Collaterals/pages/CollateralsPage";
import LoanPage from "./components/Loans/pages/LoanPage";
import ClientsPage from "./components/Clients/pages/ClientsPage";
import LoanOfficersPage from "./components/LoanOfficers/pages/LoanOfficersPage";
import AdminsPage from "./components/Admins/pages/AdminsPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          >
            <Route path="admins" element={<AdminsPage />} />
            <Route path="collaterals" element={<CollateralsPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="loans" element={<LoansPage />} />
            <Route path="loans/:id" element={<LoanPage />} />
            <Route path="loan-officers" element={<LoanOfficersPage />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Provider>
  );
}

export default App;
