import User, { IUser } from './userModel';

class UserRepository {
    async createUser(data: any): Promise<IUser> {
        return User.create(data);
    }
}

export default UserRepository;
