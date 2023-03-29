import http from "../http-common";
import { TTableCreate } from "../type/table.type";

class TableDataService {
  get(id: String) {
    return http.get(`/tables/${id}`);
  };

  create(data: TTableCreate) {
    return http.post("/tables", data);
  };

  update(id: String, data: any) {
    return http.put(`/tables/${id}`, data);
  };

  delete(id: String) {
    return http.delete(`/tables/${id}`);
  };

  deleteAll() {
    return http.delete(`/tables`);
  };

  getAllKey(key: String) {
    return http.get(`/tables/key?keyRestaurant=${key}`);
  };
};

export default new TableDataService();