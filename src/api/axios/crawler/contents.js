import * as Axios from "api/axios";

const getList = async ({ page, ...params }) => {
  return Axios.Get("/api/crawler/contents/list/" + page);
};

const deleteContent = async ({ id, ...params }) => {
  return Axios.Delete("/api/crawler/contents", {
    id: id
  });
};

const getContentById = async ({ id, ...params }) => {
  return Axios.Get("/api/crawler/contents/" + id);
};

export { getList, deleteContent, getContentById };
