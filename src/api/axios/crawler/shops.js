import * as Axios from "api/axios";

const getList = async ({ page, ...params }) => {
  return Axios.Get("/api/crawler/shops/list/" + page);
};

const deleteShopById = async ({ id, ...params }) => {
  return Axios.Delete("/api/crawler/shops/" + id);
};

export { getList, deleteShopById };
