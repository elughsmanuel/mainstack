import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../users/userRepository';
import Unauthenticated from '../errors/Unauthenticated';
import { WRONG_CREDENTIALS } from './constants';

class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async signUp(data: any) {
        const createToken = (userId: string): string => {
            const secret = String(process.env.JWT_SECRET);
            const expiresIn = process.env.JWT_EXPIRES_IN;
        
            const token = jwt.sign({ userId }, secret, { expiresIn}); 
        
            return token;
        };

        const user = await this.userRepository.createUser(data);
        
        const accessToken = createToken(user._id);

        return { 
            success: true, 
            data: user,
            accessToken,
        }
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Unauthenticated(WRONG_CREDENTIALS);
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
            throw new Unauthenticated(WRONG_CREDENTIALS);
        }

        const generateToken = (userId: string): string => {
            const secret = String(process.env.JWT_SECRET);
            const expiresIn = process.env.JWT_EXPIRES_IN;
    
            const token = jwt.sign({ userId }, secret, { expiresIn });

            return token;
        }

        const accessToken = generateToken(user._id);

        return {
            success: true,
            data: user,
            accessToken,
        };
    }
}

export default AuthService;
