import axios from 'axios';
import instance from './config/Interceptor';
import qs from 'qs';
export function post(endPoint, params, isStringfy = true) {
  return instance.post(
    endPoint,
    isStringfy ? JSON.stringify(params) : qs.stringify(params),
  );
}

export function get(endPoint) {
  return instance.get(endPoint);
}

export function deleteCall(endPoint, params) {
  return instance.delete(endPoint, params);
}

export function putCall(endPoint, params) {
  return instance.put(endPoint, params);
}
