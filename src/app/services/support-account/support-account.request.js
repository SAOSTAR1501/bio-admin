import SysFetch from "../../fetch";
import qs from "qs";

const SupportAccountRequest = {
  delete: (id) => {
    return SysFetch.delete(`supports/${id}`);
  },
  update: (id, body) => {
    return SysFetch.put(`supports/${id}`, body);
  },
  create: (body) => {
    return SysFetch.post(`supports`, body);
  },
  get: (id) => SysFetch.get(`supports/${id}`),
  gets: (body) => {
    return SysFetch.get(
      `supports?${qs.stringify(body, { encode: false })}`
    );
  },
};

export default SupportAccountRequest;
