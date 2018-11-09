import * as AdminAxios from "./axios/auth";
import * as OwnerAxios from "./axios/owner";

const AdminApi = { ...AdminAxios };
const OwnerApi = { ...OwnerAxios };

export { AdminApi, OwnerApi };
