import { inject, injectable } from "inversify";
import TYPES from "../Config/types";
import { AccountRepository } from "../Repository/AccountRepository";
import { IsignIn, ISignUp } from "../types/account.interface";
import * as bcrypt from 'bcryptjs';
import { encode, generateOtp } from "../utils/helper";
import { OtpRepository } from "../Repository/OtpRepository";
import { OtpType, OtpUsage } from "../utils/enums";
import * as jwt from 'jsonwebtoken';

@injectable()
export class AccountService {
    constructor(
        @inject(TYPES.AccountRepository)
        private readonly accountRepository: AccountRepository,
        @inject(TYPES.OtpRepository)
        private readonly otpRepository: OtpRepository
    ) {}

    async signUp(payload: ISignUp) {
        try {
            const user = await this.accountRepository.findOne(payload.email.toLowerCase());
            if(user) {
                throw new Error(`user with the email ${payload.email} already exist`)
            }

            const hashedPassword = await this.hashPassword(payload.password)

            const sanitizedData  = {
                firstName: payload.firstName.trim().toLowerCase(),
                lastName: payload.lastName.trim().toLowerCase(),
                email: payload.email.trim().toLowerCase(),
                password: hashedPassword
            }

            const createdUser = await this.accountRepository.createUser(sanitizedData);
            const otpRecord = await this.initiateOtp({
                userId: createdUser?.id,
                type: OtpType.PIN,
                usage: OtpUsage.EMAIL_VERIFICATION,
              });

        } catch(err) {

        }
    }


    async signIn(payload: IsignIn) {
        try {
            const user: any = await this.accountRepository.findOne(payload.email.toLowerCase());
            if(!user) {
                throw new Error(`user with the email ${payload.email} does not exist`)
            }

            const isPasswordMatch = await this.validateUserPassword(
                payload.password,
                user?.password,
              );
          
              if (!isPasswordMatch) {
                return { status: false, message: 'Incorrect email or password' };
              }
          
              delete user.password;

              const tokenPayload = {
                id: user.id,
                user_name: user.userName,
                first_name: user.firstName,
                last_name: user.lastName,
              };
        
              const data = {
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                emailVerified: user.emailVerified,
              };
              const token = await this.generateTokens(tokenPayload);

              return {
                status: true,
                message: 'login successful',
                user: data,
                accessToken: token.accessToken,
              };

        } catch(err) {

        }
    }

    async getUserById(id:string) {
        return await this.accountRepository.findById(id)
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
      }

    private async initiateOtp(payload: any) {
        try {
          const { otp, timestamp, expiration_time } = await generateOtp();
    
          const OtpRecord = await this.otpRepository.create({
            otp,
            type: payload.type,
            usage: payload.usage,
            user_id: payload.userId,
            expirationTime: expiration_time,
          });
    
    
          const details = {
            timestamp,
            type: payload.type,
            otp_id: OtpRecord?.id,
          };
    
          const otpKey = await encode(JSON.stringify(details));
          // Encrypt the details object
          return {
            status: true,
            otpKey,
            message: `successfull`,
          };
        } catch (error:any) {
          return {
            status: false,
            message: error.message,
          };
        }
      }

      private async validateUserPassword(
        password: string,
        hashPassword: string,
      ): Promise<boolean> {
        const isMatched = await bcrypt.compare(password, hashPassword);
        return isMatched;
      }

      private async generateTokens(payload: any) {
        const user = { user: { ...payload } };
        const accessToken = jwt.sign(user, process.env.AT_SECRET as string, {
          issuer: 'Enyata',
          expiresIn: '2hr',
        });
        const tokens = {
          accessToken,
        };
        return tokens;
      }
}