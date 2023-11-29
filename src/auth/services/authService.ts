import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import UserRepository from '../../user/repositories/userRepository';
import Unauthenticated from '../../errors/Unauthenticated';
import { 
    WRONG_CREDENTIALS, 
    USER_NOT_FOUND,
    FORGOT_PASSWORD_REQUESTED,
    MATCHING_PASSWORD,
    PASSWORD_CHANGED,
    INVALID_TOKEN,
} from '../utils/constants';
import BadRequest from '../../errors/BadRequest';
import EmailService from '../../utils/mailer';
import UnprocessableEntity from '../../errors/UnprocessableEntity';
import { 
    createToken,
    generateToken,
} from '../utils/token';


class AuthService {
    private userRepository: UserRepository;
    private emailService: EmailService;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.emailService = new EmailService();
    }

    async signUp(data: any, res: Response) {
        const user = await this.userRepository.createUser(data);
        
        // Generate an access token for the user
        const accessToken = createToken(res, user._id, user.role);

        return { 
            success: true, 
            data: user,
            accessToken,
        }
    }

    async login(email: string, password: string, res: Response) {
        const user = await this.userRepository.findByEmailAndPassword(email);

        if (!user) {
            throw new Unauthenticated(WRONG_CREDENTIALS);
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
            throw new Unauthenticated(WRONG_CREDENTIALS);
        }

        // Generate an access token for the authenticated user
        const accessToken = generateToken(res, user._id, user.role);

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

        // Generate a reset token and set its expiration time
        const generateResetToken = () => {
            const token = crypto.randomBytes(32).toString('hex');
            return token;
          };

        const resetToken = generateResetToken();
        const tokenExpiresIn = Number(process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN);
        const expirationTime = new Date(Date.now() + tokenExpiresIn * 60 * 1000);

        await this.userRepository.updateUserResetToken(user._id, resetToken, expirationTime);

        // Send a reset password email to the user
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

        // Hash the new password and update the user's password
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(password, salt);

        await this.userRepository.updateUserPassword(user._id, hashedPassword);
    
        // Clear the user's reset token
        await this.userRepository.clearUserResetToken(user._id);

        return { 
            success: true, 
            message: PASSWORD_CHANGED,
        };
    }

    async superAdmin(data: any, res: Response) {
        const user = await this.userRepository.createSuperAdmin(data);
        
        // Generate an access token for the super admin
        const accessToken = createToken(res, user._id, user.role);

        return { 
            success: true, 
            data: user,
            accessToken,
        }
    }
}

export default AuthService;
