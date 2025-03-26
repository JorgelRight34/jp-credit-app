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
import LoansPage from "./features/Loans/pages/LoansPage";
import CollateralsPage from "./features/Collaterals/pages/CollateralsPage";
import LoanPage from "./features/Loans/pages/LoanPage";
import ProfilesPage from "./features/Profiles/pages/ProfilesPage";
import ProfilePage from "./features/Profiles/pages/ProfilePage";
import TransactionsPage from "./features/Transactions/pages/TransactionsPage";
import TransactionPage from "./features/Transactions/pages/TransactionPage";
import CollateralPage from "./features/Collaterals/pages/CollateralPage";
import ArmotizationsPage from "./features/Armotizations/pages/ArmotizationsPage";
import NotFound from "./pages/NotFound";

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
            <Route path="armotizations" element={<ArmotizationsPage />} />
            <Route path="collaterals" element={<CollateralsPage />} />
            <Route path="collaterals/:id" element={<CollateralPage />} />
            <Route path="profiles" element={<ProfilesPage />} />
            <Route path="profiles/:username" element={<ProfilePage />} />
            <Route path="loans" element={<LoansPage />} />
            <Route path="loans/:id" element={<LoanPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="transactions/:id" element={<TransactionPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
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
