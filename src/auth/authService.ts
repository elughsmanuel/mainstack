import jwt from 'jsonwebtoken';
import UserRepository from '../users/userRepository';

class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async signUp(data: any) {
        const generateToken = (userId: string): string => {
            const secret = String(process.env.JWT_SECRET);
            const expiresIn = process.env.JWT_EXPIRES_IN;
        
            const token = jwt.sign({ userId }, secret, { expiresIn}); 
        
            return token;
        };

        const signUp = await this.userRepository.createUser(data);
        
        const token = generateToken(signUp._id);

        return { 
            success: true, 
            data: signUp,
            token,
        }

    }
}

export default AuthService;
