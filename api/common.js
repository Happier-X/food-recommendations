import { post } from "../utils/request";

export function upload(file) {
  return post({
    url: "/upload",
    data: {
      file,
    },
  });
}
