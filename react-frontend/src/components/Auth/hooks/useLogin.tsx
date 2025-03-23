import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../authSlice";
import api from "../../../api";
import { User } from "../../../models/user";

const useLogin = (data: Record<string, string>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await api.post<{ user: User; token: string }>(
      "users/login",
      data
    );
    const { user, token } = response.data;

    dispatch(login(user));
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", user.username);
    navigate("/");
  };

  return [handleOnSubmit];
};

export default useLogin;
