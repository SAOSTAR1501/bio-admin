import SysFetch from "../../fetch";
import qs from "qs";

const LocalServerRequest = {
  delete: (id) => {
    return SysFetch.delete(`local-servers/${id}`);
  },
  update: (id, body) => {
    return SysFetch.put(`local-servers/${id}`, body);
  },
  create: (body) => {
    return SysFetch.post(`local-servers`, body);
  },
  getLocalServerById: (id) => SysFetch.get(`local-servers/${id}`),
  getLocalServerList: (body) => {
    return SysFetch.get(
      `local-servers?${qs.stringify(body, { encode: false })}`
    );
  },
};

export default LocalServerRequest;
