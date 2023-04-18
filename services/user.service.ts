import http from '../http-common';
import { TUserCreate } from '../type/user.type';

class UserDataService {
    create(data: TUserCreate) {
        return http.post('/users', data);
    }
}

export default new UserDataService();
