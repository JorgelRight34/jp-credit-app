import "./login.css";
import React, { useState } from "react";
import useLogin from "../../features/Auth/hooks/useLogin";

const Login = () => {
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: "Jorge",
    password: "#Juan3:16Porquedetalmaneraamodiosalmundoque",
  });

  const [handleOnSubmit] = useLogin(form);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-background">
      <div className="login-form bg-white p-3 p-lg-5 rounded-3 shadow-sm">
        <div className="d-flex justify-content-center mb-5">
          <img
            className="img-fluid header-photo"
            src="/header.jpg"
            alt="header"
          />
        </div>
        <form className="rounded-3 shadow-sm" onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              name="username"
              value={form.username}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleOnChange}
            />
          </div>
          <button className="btn btn-accent w-100" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
