import { userDao } from "../presistence/mongo/dao/user.dao.js";
import { hashPassword } from "../utils/hashPassword.js";

class UserService {
    async getAllUsers() {
        return await userDao.getAll();
    }
    async getUserById(id) {
        return await userDao.getOne({ _id: id });
    }
    async deleteUserById(id) {
        return await userDao.remove({ _id: id });
    }
    async updateUserById(id, data) {
        if (data.password) {
            data.password = hashPassword(data.password);
        }
        return await userDao.update(id, data);
    }
}
export const userService = new UserService();

