// 基础配置
const BASE_URL = "/api";

// 请求方法枚举
const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// 拦截器管理
const interceptors = {
  request: [],
  response: [],
};

export const addRequestInterceptor = (interceptor) => {
  interceptors.request.push(interceptor);
};

export const addResponseInterceptor = (interceptor) => {
  interceptors.response.push(interceptor);
};

const runRequestInterceptors = async (config) => {
  let currentConfig = { ...config };
  for (const interceptor of interceptors.request) {
    currentConfig = await interceptor(currentConfig);
  }
  return currentConfig;
};

const runResponseInterceptors = async (response) => {
  let currentResponse = response;
  for (const interceptor of interceptors.response) {
    currentResponse = await interceptor(currentResponse);
  }
  return currentResponse;
};

export const request = async (
  url,
  method = HttpMethod.GET,
  data = null,
  options = {}
) => {
  try {
    let config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    config = await runRequestInterceptors(config);

    if (data) {
      if (method === HttpMethod.GET) {
        const params = new URLSearchParams(data);
        url = `${url}?${params}`;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    const response = await fetch(`${BASE_URL}${url}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result = await response.json();

    result = await runResponseInterceptors(result);

    return result;
  } catch (error) {
    console.error("请求错误:", error);
    throw error;
  }
};

// 导出便捷方法
export const get = (url, params, options) =>
  request(url, HttpMethod.GET, params, options);
export const post = (url, data, options) =>
  request(url, HttpMethod.POST, data, options);
export const put = (url, data, options) =>
  request(url, HttpMethod.PUT, data, options);
export const del = (url, options) =>
  request(url, HttpMethod.DELETE, null, options);
export const patch = (url, data, options) =>
  request(url, HttpMethod.PATCH, data, options);

// 添加默认的token拦截器
addRequestInterceptor(async (config) => {
  const token = uni.getStorageSync("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// 添加响应拦截器处理token过期
addResponseInterceptor(async (response) => {
  if (response.code === 401) {
    uni.removeStorageSync("token");
    uni.navigateTo({
      url: "/pages/login/index",
    });
    throw new Error("token已过期，请重新登录");
  }
  return response;
});
