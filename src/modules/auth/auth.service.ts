import bcrypt from "bcryptjs";
import { prisma } from "../../config/db.js";
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
  User,
} from "./auth.schema.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config.js";



export class AuthService {
  async register(user: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await this.hashPassword(user.password);
    const userSaved = await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
    const token = await this.generateToken(userSaved.id);
    const AuthResponse: AuthResponse = {
      user: {
        id: userSaved.id,
        email: userSaved.email,
        name: userSaved.name,
      },
      token,
    };
    return AuthResponse;
  }

  async login(user: LoginInput) {
    const userFound = await this.findUserByEmail(user.email);
    if (!userFound) {
      throw new Error("Invalid credentials,Please try again");
    }
    const isPasswordValid = await this.verifyPassword(
      user.password,
      userFound.password,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials,Please try again");
    }
    const token = await this.generateToken(userFound.id);
    const AuthResponse: AuthResponse = {
      user: {
        id: userFound.id,
        email: userFound.email,
        name: userFound.name,
      },
      token,
    };
    return AuthResponse;
  }

  verifyToken(token: string): JwtPayload | string {
    const userId = jwt.verify(token, config.JWT_SECRET);
    return userId;
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async profile(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private async generateToken(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  }
}
