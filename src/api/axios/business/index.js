import * as Axios from "api/axios";

const getRequestBusiness = async ({ page, ...params }) => {
  return Axios.Get("/api/business/request/" + page);
};

const admissionRequestBusiness = async ({ id, ...params }) => {
  return Axios.Put("/api/business/request/admission/" + id);
};

export { getRequestBusiness, admissionRequestBusiness };
