import axios from "axios";
import CONST from "./services/const.js";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const timeout = CONST.REQUEST.TIME_OUT;
let AxiosClient = axios.create({
  baseURL: CONST.URL.API,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});
let AxiosClientKWT = axios.create({
  baseURL: `${CONST.URL.API}/kwt`,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

const registerInterceptorsRequest = (clientInstance) => {
  clientInstance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
registerInterceptorsRequest(AxiosClient);
registerInterceptorsRequest(AxiosClientKWT);

const registerInterceptorResponse = (clientInstance) => {
  clientInstance.interceptors.response.use(
    async (response) => {
      return response.data || response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return clientInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async function (resolve, reject) {
          const currentRefreshToken = localStorage.getItem(
            CONST.STORAGE.REFRESH_TOKEN
          );

          try {
            const refreshResult = await clientInstance({
              method: "POST",
              data: {
                refreshToken: currentRefreshToken,
              },
              url: "admin-auth/refresh-token",
            });
            if (refreshResult.success) {
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + refreshResult.data.accessToken;
              originalRequest.headers["Authorization"] =
                "Bearer " + refreshResult.data.accessToken;

              localStorage.setItem(
                CONST.STORAGE.REFRESH_TOKEN,
                refreshResult.data.refreshToken
              );
              localStorage.setItem(
                CONST.STORAGE.ACCESS_TOKEN,
                refreshResult.data.accessToken
              );

              processQueue(null, refreshResult.data.accessToken);
              isRefreshing = false;
              resolve(clientInstance(originalRequest));
            } else {
              alert("Lỗi xác thực");
              localStorage.clear();
              window.location.href = "/";
            }
          } catch (error) {
            alert("Lỗi xác thực");
            localStorage.clear();
            window.location.href = "/";
          }
        });
      }

      return Promise.reject(error);
    }
  );
};
registerInterceptorResponse(AxiosClient);
registerInterceptorResponse(AxiosClientKWT);

const setConfigAxiosClient = (accessToken, clientAxiosInstance) => {
  clientAxiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  clientAxiosInstance.defaults.timeout = timeout;
  if (accessToken) {
    clientAxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

export function setConfigAxios(accessToken) {
  setConfigAxiosClient(accessToken, AxiosClient);
  setConfigAxiosClient(accessToken, AxiosClientKWT);
}

const post = (url, data, config = {}) => {
  return AxiosClient.post(url, data, config);
};

const get = (url, data, config = {}) => {
  return AxiosClient.get(url, data, config);
};

const put = (url, data, config = {}) => {
  return AxiosClient.put(url, data, config);
};

const patch = (url, data, config = {}) => {
  return AxiosClient.patch(url, data, config);
};

const del = (url, config = {}) => {
  return AxiosClient.delete(url, config);
};

const postWithCustomHeader = (url, data, customHeaders) => {
  const config = {
    headers: {
      ...AxiosClient.defaults.headers.common,
      ...customHeaders,
    },
  };
  return AxiosClient.post(url, data, config);
};
const SysFetch = {
  post,
  get,
  put,
  patch,
  delete: del,
  postWithCustomHeader,
};

const SysFetchKWT = {
  post: (url, data, config = {}) => {
    return AxiosClientKWT.post(url, data, config);
  },
  get: (url, config = {}) => {
    return AxiosClientKWT.get(url, config);
  },
  put: (url, data, config = {}) => {
    return AxiosClientKWT.put(url, data, config);
  },
  patch: (url, data, config = {}) => {
    return AxiosClientKWT.put(url, data, config);
  },
  delete: (url, config = {}) => {
    return AxiosClientKWT.delete(url, config);
  },
  postWithCustomHeader: (url, data, customHeaders) => {
    const config = {
      headers: {
        ...AxiosClientKWT.defaults.headers.common,
        ...customHeaders,
      },
    };
    return AxiosClientKWT.post(url, data, config);
  },
};

export { SysFetchKWT };
export default SysFetch;
