import bcrypt from 'bcryptjs';
import UserRepository from '../users/userRepository';
import BadRequest from '../errors/BadRequest';
import UnprocessableEntity from '../errors/UnprocessableEntity';
import { 
    USER_NOT_FOUND,
    PASSWORD_CHANGED,
    INCORRECT_PASSWORD,
    MATCHING_PASSWORD,
    SAME_PASSWORD,
    USER_DELETED,
} from '../auth/constants';

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        const users = await this.userRepository.getAllUsers();

        return {
            status: true,
            data: users,
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
