import SysFetch from "../../fetch";
import qs from "qs";

const CustomerRequest = {
  recharge: (body) => {
    return SysFetch.post(`payment/recharge-by-admin`, body);
  },
  restore: (id) => {
    return SysFetch.post(`customer/${id}/restore`);
  },
  block: (id, body) => {
    return SysFetch.post(`customer/${id}/block`, body);
  },
  update: (id, body) => {
    return SysFetch.put(`customer/${id}`, body);
  },
  getCustomers: (body) => {
    return SysFetch.get(`customer?${qs.stringify(body, { encode: false })}`);
  },
  getCustomerById: (id) => SysFetch.get(`customer/${id}`),
  getPaymentActivities: (id, body) =>
    SysFetch.get(
      `payment-activity/${id}?${qs.stringify(body, { encode: false })}`
    ),
};

export default CustomerRequest;
