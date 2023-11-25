import User, { IUser } from './userModel';

class UserRepository {
    async createUser(data: any): Promise<IUser> {
        return User.create(data);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select('+password').lean<IUser>().exec();
    }
}

export default UserRepository;
