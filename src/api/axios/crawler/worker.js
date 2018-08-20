import * as Axios from "api/axios";

const reWork = async ({ keyword, ...params }) => {
  return Axios.Put("/api/crawler/keyword", {
    keyword: keyword
  });
};

const getWorkerByKeyword = async ({ keyword, ...params }) => {
  return Axios.Get("/api/crawler/keyword/worker/" + keyword);
};

export { reWork, getWorkerByKeyword };
