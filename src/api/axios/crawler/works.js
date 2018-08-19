import * as Axios from "api/axios";

const reWork = async ({ keyword, ...params }) => {
  return Axios.Put("/api/crawler/keyword", {
    keyword: keyword
  });
};

export { reWork };
