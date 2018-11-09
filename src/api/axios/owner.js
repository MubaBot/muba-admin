import * as Axios from "./index";

const getOwnerMemberList = async ({ page }) => {
  return Axios.Get("/auth/owner/" + page);
};

const allowOwner = async ({ id }) => {
  return Axios.Put(["/auth/owner", id, "allow"].join("/"));
};

const blockOwner = async ({ id }) => {
  return Axios.Put(["/auth/owner", id, "block"].join("/"));
};

export { getOwnerMemberList, allowOwner, blockOwner };
