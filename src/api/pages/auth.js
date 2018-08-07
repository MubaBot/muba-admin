import * as Axios from 'api/axios';

const register = async ({ ...params }) => {
  return await Axios.Post('/auth/admin', params);
  return await Axios.Post('/auth/admin', {
    id: params.id,
    username: params.username,
    email: params.email,
    password: params.password,
    repassword: params.repassword,
  });
}

const login = async ({ ...params }) => {
  return await Axios.Get('/auth/login', params);
}

const existAdminUser = async () => {
  return await Axios.Get('/auth/admin/check');
}

export {
  register,
  login,
  existAdminUser
};