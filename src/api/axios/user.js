import * as Axios from "./index";

const getUserMemberList = async ({ page }) => {
  return Axios.Get("/auth/user/" + page);
};

const allowUser = async ({ id }) => {
  return Axios.Put(["/auth/user", id, "allow"].join("/"));
};

const blockUser = async ({ id }) => {
  return Axios.Put(["/auth/user", id, "block"].join("/"));
};

export { getUserMemberList, allowUser, blockUser };
