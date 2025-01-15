import { get, patch } from "@/utils/request";

export function getUserInfo() {
  return get({
    url: "/user/info",
  });
}

export function updateUser(id, data) {
  return patch({
    url: `/user/${id}`,
    data,
  });
}

export function recommendList() {
  return get({
    url: `/user/recommend/`,
  });
}
