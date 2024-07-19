import SysFetch from "../../fetch";
import qs from "qs";

const SupportAccountRequest = {
  delete: (id) => {
    return SysFetch.delete(`jobs/${id}`);
  },
  update: (id, body) => {
    return SysFetch.put(`jobs/${id}`, body);
  },
  create: (body) => {
    return SysFetch.post(`jobs`, body);
  },
  get: (id) => SysFetch.get(`jobs/${id}`),
  gets: (body) => {
    return SysFetch.get(
      `jobs?${qs.stringify(body, { encode: false })}`
    );
  },
};

export default SupportAccountRequest;
