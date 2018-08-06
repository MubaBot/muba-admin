import * as Axios from 'api/axios';

const register = async ({ ...params }) => {
  return await Axios.Post('/auth/admin', params);
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