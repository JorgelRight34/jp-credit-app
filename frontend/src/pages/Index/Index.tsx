import { Outlet } from "react-router";
import Layout from "../../layouts/Layout";
import useUser from "../../features/Auth/hooks/useUser";

const Index = () => {
  useUser();

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Index;
