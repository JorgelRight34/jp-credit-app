import { useEffect, useState } from "react";
import { Admin } from "../../../models/admin";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { setAdmins } from "../adminsSlice";

const useAdmins = () => {
  const [adminsList, setAdminsList] = useState<Admin[]>([]);
  const dispatch = useDispatch();

  const fetchAdmins = async () => {
    const response = await api.get("users/role/admin");
    dispatch(setAdmins(response.data));
    setAdminsList(response.data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return [adminsList];
};

export default useAdmins;
