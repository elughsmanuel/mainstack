import User, { IUser } from './userModel';

class UserRepository {
    async createUser(data: any): Promise<IUser> {
        return User.create(data);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).select('+password').lean<IUser>().exec();
    }

    async updateUserResetToken(userId: string, token: string, expires: Date): Promise<void> {
        await User.findByIdAndUpdate(
            userId,
            {
                resetPasswordToken: token,
                resetPasswordExpires: expires,
            },
            { new: true }
        );
    }

    async getUserByResetToken(token: string): Promise<IUser | null> {
        return User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }, 
        }).lean<IUser>().exec();
    }

}

export default UserRepository;
