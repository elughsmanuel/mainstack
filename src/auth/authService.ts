import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import UserRepository from '../users/userRepository';
import Unauthenticated from '../errors/Unauthenticated';
import { 
    WRONG_CREDENTIALS, 
    USER_NOT_FOUND,
    FORGOT_PASSWORD_REQUESTED,
    MATCHING_PASSWORD,
    PASSWORD_CHANGED,
    INVALID_TOKEN,
} from './constants';
import BadRequest from '../errors/BadRequest';
import EmailService from '../utils/mailer';
import UnprocessableEntity from '../errors/UnprocessableEntity';


class AuthService {
    private userRepository: UserRepository;
    private emailService: EmailService;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.emailService = new EmailService();
    }

    async signUp(data: any) {
        const createToken = (userId: string, role: string): string => {
            const secret = String(process.env.JWT_SECRET);
            const expiresIn = process.env.JWT_EXPIRES_IN;
        
            const token = jwt.sign({ userId, role }, secret, { expiresIn}); 
        
            return token;
        };

        const user = await this.userRepository.createUser(data);
        
        const accessToken = createToken(user._id, user.role);

        return { 
            success: true, 
            data: user,
            accessToken,
        }
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmailAndPassword(email);

        if (!user) {
            throw new Unauthenticated(WRONG_CREDENTIALS);
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
            throw new Unauthenticated(WRONG_CREDENTIALS);
        }

        const generateToken = (userId: string, role: string): string => {
            const secret = String(process.env.JWT_SECRET);
            const expiresIn = process.env.JWT_EXPIRES_IN;
    
            const token = jwt.sign({ userId, role }, secret, { expiresIn });

            return token;
        }

        const accessToken = generateToken(user._id, user.role);

        return {
            success: true,
            data: user,
            accessToken,
        };
    }

    async forgotPassword(email: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const generateResetToken = () => {
            const token = crypto.randomBytes(32).toString('hex');
            return token;
          };

        const resetToken = generateResetToken();
        const tokenExpiresIn = Number(process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN);
        const expirationTime = new Date(Date.now() + tokenExpiresIn * 60 * 1000);

        await this.userRepository.updateUserResetToken(user._id, resetToken, expirationTime);

        // const hashToken = (token: string) => {
        //     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        //     return hashedToken;
        // };

        // const hashedToken = hashToken(resetToken);

        await this.emailService.sendResetPasswordEmail(user.email, resetToken);

        return { 
            success: true, 
            message: FORGOT_PASSWORD_REQUESTED,
        };
    }

    async resetPassword(email: string, token: string, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            throw new UnprocessableEntity(MATCHING_PASSWORD);
        }

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const validToken = await this.userRepository.findByResetToken(email, token);

        if (!validToken) {
            throw new BadRequest(INVALID_TOKEN);
        }

        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(password, salt);

        await this.userRepository.updateUserPassword(user._id, hashedPassword);
    
        await this.userRepository.clearUserResetToken(user._id);

        return { 
            success: true, 
            message: PASSWORD_CHANGED,
        };
    }
}

export default AuthService;
