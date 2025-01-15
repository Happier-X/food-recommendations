import { post } from "@/utils/request";

export function createCollection(data) {
  return post({
    url: `/collection`,
    data,
  });
}
