import * as Axios from "api/axios";

const create = async ({ ...params }) => {
  return await Axios.Post("/api/crawler/keyword", {
    keyword: params.keyword
  }).catch(err => null);
};

export { create };
