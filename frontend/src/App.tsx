import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./common/ProtectedRoute";
import LoadingBar from "./common/ui/LoadingBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
const Login = lazy(() => import("./pages/Login/Login"));
const Index = lazy(() => import("./pages/Index/Index"));
const LoansPage = lazy(() => import("./features/Loans/pages/LoansPage"));
const CollateralsPage = lazy(
  () => import("./features/Collaterals/pages/CollateralsPage")
);
const LoanPage = lazy(() => import("./features/Loans/pages/LoanPage"));
const ProfilesPage = lazy(
  () => import("./features/Profiles/pages/ProfilesPage")
);
const NotesPage = lazy(() => import("./features/Notes/pages/NotesPage"));
const NotePage = lazy(() => import("./features/Notes/pages/NotePage"));
const ProfilePage = lazy(() => import("./features/Profiles/pages/ProfilePage"));
const TransactionsPage = lazy(
  () => import("./features/Transactions/pages/TransactionsPage")
);
const TransactionPage = lazy(
  () => import("./features/Transactions/pages/TransactionPage")
);
const CollateralPage = lazy(
  () => import("./features/Collaterals/pages/CollateralPage")
);
const ArmotizationsPage = lazy(
  () => import("./features/Armotizations/pages/ArmotizationsPage")
);
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 120000, gcTime: 12000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LoadingBar />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
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
                <Route
                  path="collaterals/:id/:tab?"
                  element={<CollateralPage />}
                />
                <Route path="notes" element={<NotesPage />} />
                <Route path="notes/:id" element={<NotePage />} />
                <Route path="profiles" element={<ProfilesPage />} />
                <Route
                  path="profiles/:username/:tab?"
                  element={<ProfilePage />}
                />
                <Route path="loans" element={<LoansPage />} />
                <Route path="loans/:id/:tab?" element={<LoanPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="transactions/:id" element={<TransactionPage />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
    </QueryClientProvider>
  );
}

export default App;
