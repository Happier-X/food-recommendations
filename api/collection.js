import { post, get } from "@/utils/request";

export function createCollection(data) {
  return post({
    url: `/collection`,
    data,
  });
}

export function collectionList() {
  return get({
    url: `/collection`,
  });
}
