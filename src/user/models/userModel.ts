import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { 
    FIRST_NAME_REQUIRED,
    LAST_NAME_REQUIRED,
    EMAIL_REQUIRED,
    USERNAME_REQUIRED,
    PASSWORD_REQUIRED,
    CONFIRM_PASSWORD_REQUIRED,
    VALID_EMAIL,
    VALID_PASSWORD,
    MATCHING_PASSWORD,

 } from '../../auth/utils/constants';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
    password: string;
    confirmPassword?: string;
    resetPasswordToken?: string;
    resetPasswordExpires: Date;
}

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, FIRST_NAME_REQUIRED],
        },
        lastName: {
            type: String,
            required: [true, LAST_NAME_REQUIRED],
        },
        email: {
            type: String,
            required: [true, EMAIL_REQUIRED],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, VALID_EMAIL],
        },
        username: {
            type: String,
            required: [true, USERNAME_REQUIRED],
            unique: true,
            lowercase: true,
        },
        role: {
            type: String,
            enum: ['super-admin', 'admin', 'user'],
            default: 'user',
        },
        password: {
            type: String,
            required: [true, PASSWORD_REQUIRED],
            minlength: [8, VALID_PASSWORD],
            select: false,
        },
        confirmPassword: {
            type: String,
            required: [true, CONFIRM_PASSWORD_REQUIRED],
            validate: {
                validator: function(this: IUser, value: string) {
                    return value === this.password;
                },
                message: MATCHING_PASSWORD,
            },
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre<IUser>('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        this.password = await bcrypt.hash(this.password, salt);
    }
    if (this.confirmPassword) {
        this.confirmPassword = undefined;
    }

    next();
});

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
