import * as Axios from "api/axios";

const getList = async ({ page, ...params }) => {
  return Axios.Get("/api/crawler/shops/list/" + page);
};

const deleteShopById = async ({ id, ...params }) => {
  return Axios.Delete("/api/crawler/shops/" + id);
};

const moveShops = async ({ pageCount, page }) => {
  return Axios.Post("/api/crawler/shops/move", {
    pageCount: pageCount,
    page: page
  });
};

const reSearch = async ({ count }) => {
  return Axios.Put("/api/crawler/shops/search", {
    count
  });
};

export { getList, deleteShopById, moveShops, reSearch };
