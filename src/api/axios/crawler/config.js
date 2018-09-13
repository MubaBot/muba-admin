import * as Axios from "api/axios";

const getSearchConfigList = async ({ ...params }) => {
  return Axios.Get("/api/crawler/config/search");
};

const insertSearchConfig = async ({ id, name, url, query, tag, page, count, start, ...params }) => {
  return Axios.Post("/api/crawler/config/search", { id, name, url, query, tag, page, count, start });
};

const appendSearchMode = async ({ _id, id, name, param, value, ...params }) => {
  return Axios.Post("/api/crawler/config/search/" + _id, { id, name, param, value });
};

const deleteSearchConfig = async ({ id, ...params }) => {
  return Axios.Delete("/api/crawler/config/search/" + id);
};

const deleteMode = async ({ id, mode, ...params }) => {
  return Axios.Delete(["/api/crawler/config/search", id, mode].join("/"));
};

const getContentConfigList = async ({ ...params }) => {
  return Axios.Get("/api/crawler/config/content");
};

const insertContentConfig = async ({ domain, title, content, comment, ...params }) => {
  return Axios.Post("/api/crawler/config/content", { domain, title, content, comment });
};

const updateContentConfig = async ({ domain, title, content, comment }) => {
  return Axios.Put("/api/crawler/config/content/" + domain, { title, content, comment });
};

const deleteContentConfig = async ({ id, ...params }) => {
  return Axios.Delete("/api/crawler/config/content/" + id);
};

export { getSearchConfigList, insertSearchConfig, appendSearchMode, deleteSearchConfig, deleteMode, getContentConfigList, insertContentConfig, updateContentConfig, deleteContentConfig };
