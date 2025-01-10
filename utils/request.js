const TOKEN_KEY = "token";
const BASE_URL = "http://localhost:3000";
const REQUEST_TIMEOUT = 15000;
const LOADING_DELAY = 50;
let loadingTimer;

function getURL(url) {
  if (!/https|http/.test(url)) {
    return url.startsWith("/") ? `${BASE_URL}${url}` : `${BASE_URL}/${url}`;
  }
  return url;
}

function requestInterceptor(config) {
  const token = uni.getStorageSync(TOKEN_KEY);
  if (token) {
    config.header.Authorization = `Bearer ${token}`;
  }
  return config;
}

function responseInterceptor(response) {
  if (response.statusCode === 401) {
    uni.removeStorageSync(TOKEN_KEY);
    uni.showToast({
      title: "登录过期，请重新登录",
      icon: "none",
    });
    uni.navigateTo({
      url: "/pages/auth/index",
    });
    return;
  }
  return response;
}

function request(options) {
  return new Promise((resolve, reject) => {
    let config = {
      ...options,
      url: getURL(options.url),
      timeout: REQUEST_TIMEOUT,
      header: {
        "Content-Type": "application/json",
        ...options.header,
      },
    };

    config = requestInterceptor(config);

    // 延迟显示loading
    loadingTimer = setTimeout(() => {
      uni.showLoading({
        title: "加载中",
      });
    }, LOADING_DELAY);

    uni.request({
      ...config,
      success: (res) => {
        clearTimeout(loadingTimer);
        uni.hideLoading();

        const response = responseInterceptor(res);
        if (!response) return;

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res);
          uni.showToast({
            title: res.data.message || "请求失败",
            icon: "none",
          });
        }
      },
      fail: (err) => {
        clearTimeout(loadingTimer);
        uni.hideLoading();
        reject(err);
        uni.showToast({
          title: "网络错误",
          icon: "none",
        });
      },
    });
  });
}

export const get = (params) => {
  return request({ ...params, method: "GET" });
};

export const post = (params) => {
  return request({ ...params, method: "POST" });
};

export const put = (params) => {
  return request({ ...params, method: "PUT" });
};

export const del = (params) => {
  return request({ ...params, method: "DELETE" });
};

export const patch = (params) => {
  return request({ ...params, method: "PATCH" });
};
