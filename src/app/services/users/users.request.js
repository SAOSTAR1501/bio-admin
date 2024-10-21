import SysFetch from "../../fetch";

const SupportAccountRequest = {
  delete: (id) => {
    return SysFetch.delete(`/admin-api/customers/${id}`);
  },
  update: (id, body) => {
    return SysFetch.put(`/admin-api/customers/${id}`, body);
  },
  get: (id) => SysFetch.get(`/admin-api/customers/${id}`),
  gets: (page, pageSize ) => {
    return SysFetch.get(`/admin-api/customers`,{
      params: { page, pageSize }
    });
  },
};


export default SupportAccountRequest;
