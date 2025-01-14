import { get, post } from "@/utils/request";

export function getFoodList() {
  return get({
    url: "/food/list",
  });
}

export function createFood(data) {
  return post({
    url: "/food",
    data,
  });
}
