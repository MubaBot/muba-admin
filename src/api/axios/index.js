import axios from 'axios';

const URL = "https://api.micalgenus.ml";
if (localStorage.getItem('authentication') == null) localStorage.setItem('authentication', 'null');

const CORS = (options) => ({ ...options, headers: { ...options.headers, 'Access-Control-Allow-Origin': '*' } });
const appendAuth = (options) => (localStorage.getItem('authentication') !== 'null' ? { ...options, headers: { ...options.headers, 'x-access-token': localStorage.getItem('authentication') } } : options);

const optionBuild = (options) => {
  // const opt = appendAuth(CORS({ data: options })); console.log(opt); return opt;
  return appendAuth(CORS({ data: options }));
}

const setAuth = (auth = 'null') => { localStorage.setItem('authentication', auth); };

const Get = async (url, options) => { return axios.get(URL + url, optionBuild(options)); }
const Post = async (url, options) => { return axios.post(URL + url, optionBuild(options)); }
const Put = async (url, options) => { return axios.put(URL + url, optionBuild(options)); }
const Delete = async (url, options) => { return axios.delete(URL + url, optionBuild(options)); }

export { setAuth, Get, Post, Put, Delete };