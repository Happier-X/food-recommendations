import { get, del, post } from "../utils/request";

export function createFood(data) {
  return post({
    url: "/food",
    data,
  });
}

export function food(params) {
  return get({
    url: "/food",
    params,
  });
}

export function foodDetail(id) {
  return get({
    url: `/food/${id}`,
  });
}

export function deleteFood(id) {
  return del({
    url: `/food/${id}`,
  });
}
