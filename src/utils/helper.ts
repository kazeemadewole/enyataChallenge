import 'dotenv/config'
const crypto = require('crypto');
const iv = Buffer.from(`${process.env.IV}`);
const ivstring = iv.toString('hex').slice(0, 16);

export const generateSixDigitVerificationCode = (): string => {
    return Math.floor(Math.random() * (100000 - 999999 + 1) + 999999).toString();
  };
  

export async function generateOtp(validtime = 120) {
    const otp =
      process.env.BACKEND_ENV === 'prod'
        ? generateSixDigitVerificationCode()
        : '123456';
    const timestamp = new Date();
    const expiration_time = timestamp
      .setSeconds(timestamp.getSeconds() + validtime)
      .toFixed();
  
    return { otp, timestamp, expiration_time };
  }

  function password_derive_bytes(password:string, salt:string, iterations: number, len: number) {
    let key = Buffer.from(password + salt);
    for (let i = 0; i < iterations; i++) {
      key = sha1(key);
    }
    if (key.length < len) {
      const hx = password_derive_bytes(password, salt, iterations - 1, 20);
      for (let counter = 1; key.length < len; ++counter) {
        key = Buffer.concat([
          key,
          sha1(Buffer.concat([Buffer.from(counter.toString()), hx])),
        ]);
      }
    }
    return Buffer.alloc(len, key);
  }
  
  export async function encode(string: any, secret = null) {
    const key = password_derive_bytes(
      secret ? secret : process.env.CRYPT_PASSWORD as string,
      '',
      100,
      32,
    );
    // Initialize Cipher Object to encrypt using AES-256 Algorithm
    const cipher = crypto.createCipheriv('aes-256-cbc', key, ivstring);
    const part1 = cipher.update(string, 'utf8');
    const part2 = cipher.final();
    const encrypted = Buffer.concat([part1, part2]).toString('base64');
    return encrypted;
  }
  
  // Function to decode the object
  export async function decode(string:string, secret = null) {
    const key = password_derive_bytes(
      secret ? secret : process.env.CRYPT_PASSWORD as string,
      '',
      100,
      32,
    );
    // Initialize decipher Object to decrypt using AES-256 Algorithm
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivstring);
    let decrypted = decipher.update(string, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }