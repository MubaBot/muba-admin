import axios from "axios";

const apiAxios = axios.create({
  baseURL: "https://api.micalgenus.ml",
  headers: { "Access-Control-Allow-Origin": "*" }
});

if (localStorage.getItem("authentication") == null) localStorage.setItem("authentication", "null");

const appendAuth = options => (localStorage.getItem("authentication") !== "null" ? { ...options, headers: { ...options.headers, "x-access-token": localStorage.getItem("authentication") } } : options);
const optionBuild = options => appendAuth({ data: options });

const setAuth = (auth = "null") => {
  localStorage.setItem("authentication", auth);
};

const doAxios = (method, url, options) =>
  apiAxios({
    method: method,
    url: url,
    ...optionBuild(options)
  });

const Get = async (url, options) => doAxios("GET", url, options);
const Post = async (url, options) => doAxios("POST", url, options);
const Put = async (url, options) => doAxios("PUT", url, options);
const Delete = async (url, options) => doAxios("DELETE", url, options);

export { setAuth, Get, Post, Put, Delete };
