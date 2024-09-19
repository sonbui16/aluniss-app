import {create} from 'apisauce';
import {API_TIMEOUT, END_POINT, END_POINT_HUECHIAKI} from '../../constants/api';

// Create base http request use apisauce - base from axios -- https://github.com/infinitered/apisauce
const API = create({
  baseURL: END_POINT,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const API_HUECHIAKI = create({
  baseURL: END_POINT_HUECHIAKI,
  timeout: API_TIMEOUT,
  headers: {
    // Accept: 'application/json',
    'Accept-Language': 'vi',
  },
});
const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlaWQiOiI2MTc0MWJkZjQxMDhkM2U5NjY4YjQ1YjAiLCJ0aW1lIjoxNjk2NDk0NTc5fQ.xA9sMD5zeQrTUKdpSI0fi3YIPzIZ2Z35Cj5JxDCrOr4`;
const site_id = '6662710ce275cb629545e50e';
// const site_id = '668491dfbab32107008b4567';


export {API, API_HUECHIAKI, token, site_id};