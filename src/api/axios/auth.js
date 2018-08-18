import * as Axios from "./index";

const checkLogin = async () => {
  const result = await Axios.Get("/auth/login");
  const isLogin = result.data.isLogin;

  if (!isLogin) Axios.setAuth();
  return isLogin;
};

const register = async ({ ...params }) => {
  return await Axios.Post("/auth/admin", {
    id: params.id,
    username: params.username,
    email: params.email,
    password: params.password,
    repassword: params.repassword
  });
};

const login = async ({ ...params }) => {
  return await Axios.Post("/auth/login", {
    ID: params.id,
    PW: params.password
  }).then(result => {
    Axios.setAuth(result.data);

    return true;
  });
};

const existAdminUser = async () => {
  return await Axios.Get("/auth/admin/exist");
};

export { login, register, checkLogin, existAdminUser };
