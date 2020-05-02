import {URL} from './config.js';
export let socket = io(URL, { query: `at=${Cookies.get('at')}` });