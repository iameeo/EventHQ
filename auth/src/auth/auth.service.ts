import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable() // 의존성 주입 가능한 서비스
export class AuthService {
  constructor( // 생성자 - 의존성 주입
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) { // 비동기 함수
    const hashed = await bcrypt.hash(password, 10);
    const created = new this.userModel({ username, password: hashed, role: 'USER' });
    return created.save();
  }

  async validateUser(username: string, password: string) { // 비동기 함수
    const user = await this.userModel.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) { // 비동기 함수
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}