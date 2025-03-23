import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { setUser } from "../authSlice";
import { useEffect } from "react";
import { RootState } from "../../../models/rootState";

const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const response = await api.get("users/Jorge");
    dispatch(setUser(response.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return [user];
};

export default useUser;
