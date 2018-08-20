import * as Axios from "api/axios";

const getList = async ({ page, ...params }) => {
  return Axios.Get("/api/crawler/working/list/" + page);
};

const deleteWorkingById = async ({ id, ...params }) => {
  return Axios.Delete("/api/crawler/working/" + id);
};

export { getList, deleteWorkingById };
