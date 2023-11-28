import User, { IUser } from '../models/userModel';

class UserRepository {
    async createUser(data: any): Promise<IUser> {
        const user = await User.create(data);

        return user;
    }

    async findByEmailAndPassword(email: string): Promise<IUser | null> {
        const user = User.findOne({ email }).select('+password').lean<IUser>().exec();

        return user;
    }

    async updateUserResetToken(userId: string, token: string, expires: Date): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                resetPasswordToken: token,
                resetPasswordExpires: expires,
            },
            { new: true },
        );

        return updatedUser;
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
    
    async updateUserPassword(userId: string, hashedPassword: string): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true },
        );

        return updatedUser;
    }
    
    async clearUserResetToken(userId: string): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
            { new: true },
        );

        return updatedUser;
    }

    async getAllUsers(role: any, skip: any, perPage: any): Promise<IUser[]> {
        const query: { role?: string } = {};

        if (role) {
          query.role = role;
        }

        let queryBuilder = User.find(query).skip(skip).limit(perPage);

        const users = await queryBuilder.exec();
        
        return users;
    }

    async getTotalUserCount(role: any): Promise<number> {
        
        return await User.countDocuments(role).exec();
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const user = await User.findById(userId);

        return user;
    }

    async updateMyProfile(userId: string, data: any): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: data },
            { new: true },
        );

        return updatedUser;
    }

    async findPasswordByUserId(userId: string): Promise<string | null> {
        const user = await User.findById(userId).select('+password').lean<IUser>().exec();
    
        return user?.password || null;
    }

    async findByIdAndDelete(userId: string): Promise<IUser | null> {
        const user = await User.findByIdAndDelete(userId);

        return user;
    }

    async updateUser(userId: string, data: any): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: data },
            { new: true },
        );

        return updatedUser;
    }

    async updateUserRole(userId: string, role: any): Promise<IUser | null> {
        const updatedUserRole = await User.findByIdAndUpdate(
            userId,
            { $set: role },
            { new: true },
        );

        return updatedUserRole;
    }

    async createSuperAdmin(data: any): Promise<IUser> {
        const user = await User.create(data);

        return user;
    }
}

export default UserRepository;
