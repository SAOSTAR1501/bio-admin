import SysFetch from "../../fetch";

const SupportAccountRequest = {
  delete: (id) => {
    return SysFetch.delete(`admin-api/job/${id}`);
  },
  update: (id, body) => {
    return SysFetch.put(`admin-api/job/${id}`, body);
  },
  create: (body) => {
    return SysFetch.post(`admin-api/job`, body);
  },
  get: (id) => SysFetch.get(`admin-api/job/${id}`),
  gets: () => {
      return SysFetch.get(`/admin-api/job`)
  },
};

export default SupportAccountRequest;
