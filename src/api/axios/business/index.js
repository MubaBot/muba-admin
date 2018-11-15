import * as Axios from "api/axios";

const getRequestBusiness = async ({ page, ...params }) => {
  return Axios.Get("/api/business/request/" + page);
};

const getRequestBusinessLog = async ({ page, ...params }) => {
  return Axios.Get("/api/business/request/log/" + page);
};

const admissionRequestBusiness = async ({ id, ...params }) => {
  return Axios.Put("/api/business/request/admission/" + id);
};

const getShopListForAdmin = async ({ page, mode, name, owner }) => {
  switch (mode) {
    case "address":
      return Axios.Get(["/api/business/shop", page, "address"].join("/"));
    case "name":
      return Axios.Get(["/api/business/shop", page, "name", name].join("/"));
    case "owner":
      return Axios.Get(["/api/business/shop", page, "owner", owner].join("/"));
    default:
      return Axios.Get(["/api/business/shop", page, "name", ""].join("/"));
  }
};

const deleteShopByAdmin = async ({ id }) => {
  return Axios.Delete("/api/business/shop/" + id);
};

const updateShopAddressLatLng = async ({ shop, address, lat, lng }) => {
  return Axios.Put(["/api/shop", shop, "latlng"].join("/"), {
    address,
    lat,
    lng
  });
};

const getRequestShopService = async ({ page }) => {
  return Axios.Get("/api/shop/service/" + page);
};

const allowRequest = async ({ id }) => {
  return Axios.Put(["/api/business/service", id, "allow"].join("/"));
};

const refuseRequest = async ({ id }) => {
  return Axios.Put(["/api/business/service", id, "refuse"].join("/"));
};

export {
  getRequestBusiness,
  getRequestBusinessLog,
  admissionRequestBusiness,
  getShopListForAdmin,
  deleteShopByAdmin,
  updateShopAddressLatLng,
  getRequestShopService,
  allowRequest,
  refuseRequest
};
