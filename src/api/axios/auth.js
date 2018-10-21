import * as Axios from "./index";

const checkLogin = async () => {
  const result = await Axios.Get("/auth/login");
  const isLogin = result.data.isLogin;

  if (!isLogin) Axios.setAuth();
  return isLogin;
};

const register = async ({ id, username, email, password, repassword, ...params }) => {
  return await Axios.Post("/auth/admin", {
    id: id,
    username: username,
    email: email,
    password: password,
    repassword: repassword
  });
};

const login = async ({ id, password, ...params }) => {
  return await Axios.Post("/auth/login", {
    ID: id,
    PW: password
  }).then(result => {
    Axios.setAuth(result.data);
    return true;
  });
};

const existAdminUser = async () => {
  return await Axios.Get("/auth/admin/exist");
};

const getAdminMemberList = async ({ page }) => {
  return Axios.Get("/auth/admin/" + page);
};

const allowAdmin = async ({ id }) => {
  return Axios.Put(["/auth/admin", id, "allow"].join("/"));
};

const blockAdmin = async ({ id }) => {
  return Axios.Put(["/auth/admin", id, "block"].join("/"));
};

export { login, register, checkLogin, existAdminUser, getAdminMemberList, allowAdmin, blockAdmin };
