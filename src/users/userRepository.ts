import User, { IUser } from './userModel';

class UserRepository {
    async createUser(data: any): Promise<IUser> {
        return User.create(data);
    }

    async findByEmailAndPassword(email: string): Promise<IUser | null> {
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

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        return user;
    }

    async findByResetToken(email: string, token: string): Promise<IUser | null> {
        const user = await User.findOne({
            email,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        });

        return user;
    }
    
    async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
        await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );
    }
    
    async clearUserResetToken(userId: string): Promise<void> {
        await User.findByIdAndUpdate(
            userId,
            {
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
            { new: true }
        );
    }    

    async getAllUsers(): Promise<IUser[]> {
        const users = await User.find();
        
        return users;
    }
}

export default UserRepository;
