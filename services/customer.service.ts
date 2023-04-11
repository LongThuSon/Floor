import http from '../http-common';
import { TypeService } from '../public/data-constant';
import { TCustomerCreate } from '../type/customer.type';

class CustomerDataService {
    get(id: String) {
        return http.get(`/customers/${id}`);
    }

    create(data: TCustomerCreate) {
        return http.post('/customers', data);
    }

    update(id: String, data: any) {
        return http.put(`/customers/${id}`, data);
    }

    getAllService(key: String, typeService: TypeService, dateOrder: number) {
        return http.get(
            `/customers/service?keyRestaurant=${key}&typeService=${typeService}&dateOrder=${dateOrder}`,
        );
    }
}

export default new CustomerDataService();
