import { post } from "@/utils/request";

export function createFood(data) {
  return post({
    url: "/food",
    data,
  });
}
