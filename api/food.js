import { post } from "@/utils/request";

export default {
  createFood(data) {
    return post({
      url: "/food",
      data,
    });
  },
};
