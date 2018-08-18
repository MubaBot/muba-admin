import * as Axios from "api/axios";

const create = async ({ keyword, ...params }) => {
  return Axios.Post("/api/crawler/keyword", {
    keyword: keyword
  });
};

const getList = async ({ page, ...params }) => {
  return Axios.Get("/api/crawler/keyword/list/" + page, {
    page: page
  }).catch(err => null);
};

export { create, getList };
