import axios from 'axios';

const URL = "http://192.168.0.8:3030";

const CORS = (options) => ({ ...options, headers: { ...options.headers, 'Access-Control-Allow-Origin': '*' } });

const optionBuild = (options) => CORS({ data: options });

const Get = async (url, options) => { return axios.get(URL + url, optionBuild(options)); }
const Post = async (url, options) => { return axios.post(URL + url, optionBuild(options)); }
const Put = async (url, options) => { return axios.put(URL + url, optionBuild(options)); }
const Delete = async (url, options) => { return axios.delete(URL + url, optionBuild(options)); }

export { Get, Post, Put, Delete };