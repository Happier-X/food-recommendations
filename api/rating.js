import { post, get } from "@/utils/request";

export function rating(data) {
  return post({
    url: `/rating`,
    data,
  });
}

export function getRatingList(id) {
  return get({
    url: `/rating/${id}`,
  });
}
