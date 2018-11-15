import * as AdminAxios from "./axios/auth";
import * as OwnerAxios from "./axios/owner";
import * as UserAxios from "./axios/user";

import * as BusinessAxios from "./axios/business";

const AdminApi = { ...AdminAxios };
const OwnerApi = { ...OwnerAxios };
const UserApi = { ...UserAxios };

const BusinessApi = { ...BusinessAxios };

export { AdminApi, OwnerApi, UserApi, BusinessApi };
