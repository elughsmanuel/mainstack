import UserRepository from '../users/userRepository';
import BadRequest from '../errors/BadRequest';
import { USER_NOT_FOUND } from '../auth/constants';

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
}

export default UserService;
