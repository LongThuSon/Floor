import http from "../http-common";
import { TCustomerCreate } from "../type/customer.type";

class CustomerDataService {
  get(id: String) {
    return http.get(`/customers/${id}`);
  };

  create(data: TCustomerCreate) {
    return http.post("/customers", data);
  };

  update(id: String, data: any) {
    return http.put(`/customers/${id}`, data);
  };

  getAllKey(key: String) {
    return http.get(`/customers/key?keyRestaurant=${key}`);
  };
};

export default new CustomerDataService();