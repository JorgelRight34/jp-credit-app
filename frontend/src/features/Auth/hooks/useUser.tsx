import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { setUser } from "../authSlice";
import { useEffect } from "react";
import { RootState } from "../../../store";
import { baseUrl } from "../lib/constants";

const useUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const response = await api.get(`${baseUrl}/${username}`);
    dispatch(setUser(response.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return [user];
};

export default useUser;
