import * as Axios from 'api/axios';

const register = async ({ ...params }) => {
  return await Axios.Post('/auth/admin', params);
}

export { register };