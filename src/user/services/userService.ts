import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/userRepository';
import BadRequest from '../../errors/BadRequest';
import UnprocessableEntity from '../../errors/UnprocessableEntity';
import { 
    PASSWORD_CHANGED,
    INCORRECT_PASSWORD,
    MATCHING_PASSWORD,
    SAME_PASSWORD,
    SUPER_ADMIN,
} from '../../auth/utils/constants';
import { 
    USER_NOT_FOUND,
    USER_DELETED,
    INVALID_ROLE,
} from '../utils/constants';

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(
        page: any,
        perPage: any,
        role?: string,
    ) {
        const count = await this.userRepository.getTotalUserCount(role);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);

        const users = await this.userRepository.getAllUsers(role, skip, perPage);

        return {
            status: true,
            results: users.length,
            data: users,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getUserById(userId: string) {
        const user = await this.userRepository.getUserById(userId);

        return {
            status: true,
            data: user,
        }
    }

    async getMyProfile(userId: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        return {
            status: true,
            data: user,
        }
    }

    async updateMyProfile(userId: string, data: any) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const updatedUser = await this.userRepository.updateMyProfile(userId, data);

        return {
            status: true,
            data: updatedUser,
        }
    }

    async updateMyPassword(userId: string, password: string, newPassword: string, confirmPassword: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const storedPassword = await this.userRepository.findPasswordByUserId(userId);

        if (storedPassword === null) {
            throw new BadRequest(INCORRECT_PASSWORD);
        }

        const isPasswordValid = await bcrypt.compare(password, storedPassword);
    
        if (!isPasswordValid) {
            throw new BadRequest(INCORRECT_PASSWORD);
        }

        if (newPassword !== confirmPassword) {
            throw new UnprocessableEntity(MATCHING_PASSWORD);
        }

        if(password === newPassword) {
            throw new UnprocessableEntity(SAME_PASSWORD);
        }

        // Generate a hash for the new password and update the user's password
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await this.userRepository.updateUserPassword(user._id, hashedPassword);

        return {
            status: true,
            data: PASSWORD_CHANGED,
        }
    }

    async deleteMe(userId: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        await this.userRepository.findByIdAndDelete(userId);

        return {
            status: true,
            data: USER_DELETED,
        }
    }

    async updateUser(userId: string, data: any) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const updatedUser = await this.userRepository.updateUser(userId, data);

        return {
            status: true,
            data: updatedUser,
        }
    }

    async updateUserRole(userId: string, role: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        if (user.role === SUPER_ADMIN) {
            throw new BadRequest(INVALID_ROLE);
        }

        const updatedUserRole = await this.userRepository.updateUserRole(userId, role);

        return {
            status: true,
            data: updatedUserRole,
        }
    }

    async deleteUser(userId: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        await this.userRepository.findByIdAndDelete(userId);

        return {
            status: true,
            data: USER_DELETED,
        }
    }
}

export default UserService;
