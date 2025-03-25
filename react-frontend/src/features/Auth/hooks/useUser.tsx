import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { setUser } from "../authSlice";
import { useEffect } from "react";
import { RootState } from "../../../store";

const useUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const response = await api.get("users/Jorge");
    console.log(response.data);
    dispatch(setUser(response.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return [user];
};

export default useUser;
