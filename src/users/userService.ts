import UserRepository from '../users/userRepository';

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
}

export default UserService;
